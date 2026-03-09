import Heading from '@theme/Heading';
import styles from './styles.module.css';

// Product-positioned feature pillars used for a premium AI SaaS homepage/landing section.
const featureList = [
  {
    title: 'Reliability',
    eyebrow: 'Fault Containment',
    description:
      'Continuously detect architectural anti-patterns that create blast-radius risk before they hit production.',
  },
  {
    title: 'Scalability',
    eyebrow: 'Capacity Discipline',
    description:
      'Evaluate scaling paths, data partitioning, and traffic assumptions against deterministic system design rules.',
  },
  {
    title: 'Production-Readiness',
    eyebrow: 'Operational Confidence',
    description:
      'Turn architecture reviews into measurable quality gates for observability, security, and resilience.',
  },
];

function FeatureCard({title, eyebrow, description}) {
  return (
    <article className={styles.card}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <Heading as="h3" className={styles.title}>
        {title}
      </Heading>
      <p className={styles.description}>{description}</p>
    </article>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.section} aria-label="Structra core architecture quality pillars">
      <div className="container">
        <div className={styles.grid}>
          {featureList.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
