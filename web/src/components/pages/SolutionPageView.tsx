import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/config";
import { paths, localePath } from "@/lib/routes";
import { solutions, deliveryPhases, type Solution } from "@/content/solutions";
import { Icon } from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";

export default function SolutionPageView({
  locale,
  dict,
  solution,
}: {
  locale: Locale;
  dict: Dictionary;
  solution: Solution;
}) {
  const p = (path: string) => localePath(locale, path);
  const others = solutions.filter((s) => s.slug !== solution.slug);
  const isBuild = solution.slug === "build";

  return (
    <>
      <section className="page-hero">
        <div className="tech-grid--dark" />
        <div className="wrap">
          <span className="eyebrow">{solution.eyebrow}</span>
          <h1>{solution.title}</h1>
          <p>{solution.lead}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">Overview</span>
              <h2>{solution.title}</h2>
              <p className="lead">{solution.intro}</p>
              <ul className="feature-list" style={{ marginTop: 24 }}>
                {solution.features.map((f) => (
                  <li key={f}>
                    <Icon name="check_circle" /> <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Reveal>
              <div className="media-frame">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url('${solution.photo}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-surf2">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Capabilities</span>
            <h2>What this covers</h2>
          </div>
          <div className="pillars">
            {solution.capabilities.map((c) => (
              <Reveal key={c.title} className="pillar">
                <div className="ic">
                  <Icon name={c.icon} />
                </div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {isBuild && (
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">{dict.home.deliveryEyebrow}</span>
              <h2>{dict.home.deliveryTitle}</h2>
              <p className="lead">{dict.home.deliveryLead}</p>
            </div>
            <div className="timeline">
              <div className="timeline-track">
                <div className="timeline-progress" />
              </div>
              {deliveryPhases.map((phase) => (
                <Reveal key={phase.num} className={`phase ${phase.ongoing ? "is-ongoing" : ""}`}>
                  <div className="node" />
                  <div className="pnum">PHASE {phase.num}</div>
                  <h3>
                    {phase.title}
                    {phase.ongoing && (
                      <span className="ongoing-badge">
                        <Icon name="all_inclusive" /> {dict.common.ongoing}
                      </span>
                    )}
                  </h3>
                  <p>{phase.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* cross-links to the other two pathways */}
      <section className="section bg-surf2">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">The full journey</span>
            <h2>One partner, three connected pathways</h2>
          </div>
          <div className="project-grid">
            {others.map((o) => (
              <Link key={o.slug} className="card" href={p(`/${o.slug}`)}>
                <div className="ic">
                  <Icon name={o.icon} />
                </div>
                <h3>{o.title}</h3>
                <p>{o.lead}</p>
                <span className="link-arrow" style={{ marginTop: 14 }}>
                  {dict.common.learnMore} <Icon name="arrow_right_alt" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="tech-grid--dark" />
        <div className="wrap">
          <h2>{dict.home.ctaTitle}</h2>
          <p>{dict.home.ctaBody}</p>
          <div className="cta-actions">
            <Link className="btn btn-primary" href={p(paths.contact)}>
              {dict.common.discussProject} <Icon name="arrow_forward" />
            </Link>
            <Link className="btn btn-ghost" href={p(paths.projects)}>
              {dict.common.seeProjects}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
