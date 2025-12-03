import * as fs from 'fs';
import * as path from 'path';

const LOCALES = ['es', 'fr', 'he'] as const;
const ROOT_DIR = path.resolve(__dirname, '..');

interface MissingTranslation {
  locale: string;
  sourcePath: string;
  expectedPath: string;
}

interface MissingKey {
  locale: string;
  file: string;
  keys: string[];
}

interface StaleTranslation {
  locale: string;
  sourcePath: string;
  translatedPath: string;
  daysBehind: number;
}

interface ValidationResult {
  missingFiles: MissingTranslation[];
  missingKeys: MissingKey[];
  staleTranslations: StaleTranslation[];
}

function getMarkdownFiles(dir: string): string[] {
  const files: string[] = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
}

function checkMarkdownFiles(): MissingTranslation[] {
  const missing: MissingTranslation[] = [];
  const docsDir = path.join(ROOT_DIR, 'docs');
  const blogDir = path.join(ROOT_DIR, 'blog');

  // Check docs
  const docFiles = getMarkdownFiles(docsDir);
  for (const sourceFile of docFiles) {
    const relativePath = path.relative(docsDir, sourceFile);

    for (const locale of LOCALES) {
      const expectedPath = path.join(
        ROOT_DIR,
        'i18n',
        locale,
        'docusaurus-plugin-content-docs',
        'current',
        relativePath
      );

      if (!fs.existsSync(expectedPath)) {
        missing.push({
          locale,
          sourcePath: sourceFile,
          expectedPath,
        });
      }
    }
  }

  // Check blog
  const blogFiles = getMarkdownFiles(blogDir);
  for (const sourceFile of blogFiles) {
    const relativePath = path.relative(blogDir, sourceFile);

    for (const locale of LOCALES) {
      const expectedPath = path.join(
        ROOT_DIR,
        'i18n',
        locale,
        'docusaurus-plugin-content-blog',
        relativePath
      );

      if (!fs.existsSync(expectedPath)) {
        missing.push({
          locale,
          sourcePath: sourceFile,
          expectedPath,
        });
      }
    }
  }

  return missing;
}

function checkJsonTranslations(): MissingKey[] {
  const issues: MissingKey[] = [];
  const enCodePath = path.join(ROOT_DIR, 'i18n', 'en', 'code.json');

  if (!fs.existsSync(enCodePath)) {
    console.log('Note: English code.json not found. Run `pnpm write-translations` first.');
    return issues;
  }

  const enCodeJson = JSON.parse(fs.readFileSync(enCodePath, 'utf8'));
  const enKeys = Object.keys(enCodeJson);

  for (const locale of LOCALES) {
    const localeCodePath = path.join(ROOT_DIR, 'i18n', locale, 'code.json');

    if (!fs.existsSync(localeCodePath)) {
      issues.push({
        locale,
        file: 'code.json',
        keys: enKeys,
      });
      continue;
    }

    const localeJson = JSON.parse(fs.readFileSync(localeCodePath, 'utf8'));
    const localeKeys = Object.keys(localeJson);
    const missingKeys = enKeys.filter((k) => !localeKeys.includes(k));

    if (missingKeys.length > 0) {
      issues.push({
        locale,
        file: 'code.json',
        keys: missingKeys,
      });
    }
  }

  return issues;
}

function checkStaleTranslations(): StaleTranslation[] {
  const stale: StaleTranslation[] = [];
  const docsDir = path.join(ROOT_DIR, 'docs');
  const docFiles = getMarkdownFiles(docsDir);

  for (const sourceFile of docFiles) {
    const sourceStat = fs.statSync(sourceFile);
    const relativePath = path.relative(docsDir, sourceFile);

    for (const locale of LOCALES) {
      const translatedPath = path.join(
        ROOT_DIR,
        'i18n',
        locale,
        'docusaurus-plugin-content-docs',
        'current',
        relativePath
      );

      if (fs.existsSync(translatedPath)) {
        const translatedStat = fs.statSync(translatedPath);

        if (sourceStat.mtime > translatedStat.mtime) {
          const daysBehind = Math.floor(
            (sourceStat.mtime.getTime() - translatedStat.mtime.getTime()) /
              (1000 * 60 * 60 * 24)
          );

          stale.push({
            locale,
            sourcePath: sourceFile,
            translatedPath,
            daysBehind,
          });
        }
      }
    }
  }

  return stale;
}

function printStatus(result: ValidationResult): void {
  console.log('\n=== i18n Translation Status ===\n');

  // Summary by locale
  const summary: Record<string, { missing: number; stale: number }> = {};

  for (const locale of LOCALES) {
    summary[locale] = {
      missing: result.missingFiles.filter((m) => m.locale === locale).length,
      stale: result.staleTranslations.filter((s) => s.locale === locale).length,
    };
  }

  console.log('Locale Summary:');
  console.log('---------------');
  for (const [locale, stats] of Object.entries(summary)) {
    console.log(`  ${locale}: ${stats.missing} missing files, ${stats.stale} stale translations`);
  }

  if (result.missingKeys.length > 0) {
    console.log('\nMissing JSON Keys:');
    for (const issue of result.missingKeys) {
      console.log(`  ${issue.locale}/${issue.file}: ${issue.keys.length} missing keys`);
    }
  }
}

function main(): void {
  const showStatus = process.argv.includes('--status');

  console.log('Checking i18n translations...\n');

  const result: ValidationResult = {
    missingFiles: checkMarkdownFiles(),
    missingKeys: checkJsonTranslations(),
    staleTranslations: checkStaleTranslations(),
  };

  if (showStatus) {
    printStatus(result);
    return;
  }

  let hasErrors = false;

  if (result.missingFiles.length > 0) {
    console.log(`\nMissing translations: ${result.missingFiles.length}`);
    for (const missing of result.missingFiles.slice(0, 10)) {
      console.log(`  - [${missing.locale}] ${missing.sourcePath}`);
    }
    if (result.missingFiles.length > 10) {
      console.log(`  ... and ${result.missingFiles.length - 10} more`);
    }
    hasErrors = true;
  }

  if (result.missingKeys.length > 0) {
    console.log(`\nMissing translation keys:`);
    for (const issue of result.missingKeys) {
      console.log(`  - [${issue.locale}] ${issue.file}: ${issue.keys.length} keys`);
    }
    hasErrors = true;
  }

  if (result.staleTranslations.length > 0) {
    console.log(`\nStale translations: ${result.staleTranslations.length}`);
    for (const stale of result.staleTranslations.slice(0, 10)) {
      console.log(`  - [${stale.locale}] ${stale.sourcePath} (${stale.daysBehind} days behind)`);
    }
    if (result.staleTranslations.length > 10) {
      console.log(`  ... and ${result.staleTranslations.length - 10} more`);
    }
  }

  if (!hasErrors && result.staleTranslations.length === 0) {
    console.log('All translations are complete and up to date!');
  }

  // Exit with error code if there are missing translations (for CI)
  if (hasErrors) {
    process.exit(1);
  }
}

main();
