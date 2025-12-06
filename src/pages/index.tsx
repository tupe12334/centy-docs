import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={clsx('container', styles.heroContent)}>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>
          <Translate id="homepage.tagline">
            The AI-native issue tracking system that lives in your repository
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className={styles.primaryButton}
            to="/docs/">
            <Translate id="homepage.cta.getStarted">
              Get Started
            </Translate>
          </Link>
          <Link
            className={styles.secondaryButton}
            to="https://github.com/centy-io">
            <Translate id="homepage.cta.github">
              View on GitHub
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={translate({
        id: 'homepage.title',
        message: 'AI-Native Issue Tracking',
        description: 'The homepage title',
      })}
      description={translate({
        id: 'homepage.description',
        message: 'Centy is an AI-native issue tracking system that lives in your repository. File-based, version controlled, and built for developers.',
        description: 'The homepage meta description',
      })}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
