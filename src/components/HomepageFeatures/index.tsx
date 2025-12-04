import type {ReactNode} from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: ReactNode;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: (
      <Translate id="homepage.features.fileBased.title">File-Based Storage</Translate>
    ),
    icon: '📁',
    description: (
      <Translate id="homepage.features.fileBased.description">
        All issues and documentation live in your repository as structured files.
        Version controlled, portable, and always accessible.
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="homepage.features.aiNative.title">
        AI-Native Design
      </Translate>
    ),
    icon: '🤖',
    description: (
      <Translate id="homepage.features.aiNative.description">
        Built from the ground up for LLM integration. AI assistants can read,
        create, and manage issues seamlessly through the CLI.
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="homepage.features.templates.title">
        Powerful Templates
      </Translate>
    ),
    icon: '⚡',
    description: (
      <Translate id="homepage.features.templates.description">
        Use Handlebars-powered templates for consistent issue and documentation
        creation. Customize workflows to match your team's needs.
      </Translate>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>
          {icon}
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            <Translate id="homepage.features.sectionTitle">
              Why Centy?
            </Translate>
          </Heading>
          <p className={styles.sectionSubtitle}>
            <Translate id="homepage.features.sectionSubtitle">
              A modern approach to issue tracking designed for developers and AI alike
            </Translate>
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
