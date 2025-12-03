import type {ReactNode} from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: ReactNode;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: (
      <Translate id="homepage.features.fileBased.title">File-Based Storage</Translate>
    ),
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
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
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
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
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <Translate id="homepage.features.templates.description">
        Use Handlebars-powered templates for consistent issue and documentation
        creation. Customize workflows to match your team's needs.
      </Translate>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
