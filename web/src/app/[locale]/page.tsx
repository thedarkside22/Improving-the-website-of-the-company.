import Link from "next/link";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { paths, localePath, projectPath } from "@/lib/routes";
import { site, standards } from "@/content/site";
import { solutions, deliveryPhases, pillars } from "@/content/solutions";
import { featuredProjects } from "@/content/projects";
import { Icon } from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import CleanroomExplorer from "@/components/three/CleanroomExplorer";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const p = (path: string) => localePath(locale, path);

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="hero">
        <div className="hero-photo" style={{ backgroundImage: "url('/media/photos/hero-cleanroom.jpg')" }} />
        <div className="hero-overlay" />
        <div className="wrap">
          <div className="hero-inner">
            <div>
              <span className="eyebrow">{dict.hero.eyebrow}</span>
              <h1>
                {dict.hero.titleLead} <span className="u">{dict.hero.titleAccent}</span>
              </h1>
              <p className="lead">{dict.hero.lead}</p>
              <div className="hero-cta">
                <a className="btn btn-primary" href="#explorer">
                  {dict.hero.exploreCta} <Icon name="arrow_forward" />
                </a>
                <Link className="btn btn-ghost" href={p(paths.projects)}>
                  {dict.common.seeProjects} <Icon name="play_circle" />
                </Link>
              </div>
            </div>
            <div>
              <div className="glass-card">
                <div className="gc-ic">
                  <Icon name="verified" />
                </div>
                <h3>{dict.hero.cardTitle}</h3>
                <p>{dict.hero.cardBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- trust bar ---------- */}
      <section className="compliance">
        <div className="wrap">
          {site.compliance.map((c, i) => (
            <span key={c} style={{ display: "contents" }}>
              <span>{c}</span>
              {i < site.compliance.length - 1 && <span className="dot" />}
            </span>
          ))}
        </div>
        <p className="trusted-by">
          {dict.common.trustedBy}{" "}
          {site.trustedBy.map((t, i) => (
            <span key={t}>
              <b>{t}</b>
              {i < site.trustedBy.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </section>

      {/* ---------- brand line + stats ---------- */}
      <section className="section section--tight bg-surf2">
        <div className="wrap">
          <Reveal>
            <p className="brand-line">
              Saudi-founded. Standards-obsessed. <span className="u">Trusted where it matters most.</span>
            </p>
          </Reveal>
          <div className="stats-band">
            <Reveal className="item">
              <div className="stat-num tnum">2016</div>
              <div className="stat-label">Founded by Saudi expertise</div>
            </Reveal>
            <Reveal className="item">
              <div className="stat-num">
                <CountUp to={8} />
              </div>
              <div className="stat-label">Capability areas</div>
            </Reveal>
            <Reveal className="item">
              <div className="stat-num">
                <CountUp to={10} suffix="+" />
              </div>
              <div className="stat-label">Standards & accreditation bodies</div>
            </Reveal>
            <Reveal className="item">
              <div className="stat-num">
                BSL <span className="u">3&amp;4</span>
              </div>
              <div className="stat-label">Biocontainment delivery</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- flagship 3D explorer ---------- */}
      <div id="explorer">
        <CleanroomExplorer dict={dict} />
      </div>

      {/* ---------- what we do ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{dict.home.whatWeDoEyebrow}</span>
            <h2>{dict.home.whatWeDoTitle}</h2>
            <p className="lead">{dict.home.whatWeDoLead}</p>
          </div>
          <div className="wwd-grid">
            {solutions.map((s) => (
              <Reveal key={s.slug}>
                <Link className="wwd-card" href={p(`/${s.slug}`)}>
                  <div className="wwd-photo" style={{ backgroundImage: `url('${s.photo}')` }} />
                  <div className="wwd-overlay" />
                  <div className="wwd-body">
                    <span className="group-label">{s.title}</span>
                    <div className="ic">
                      <Icon name={s.icon} />
                    </div>
                    <h3>{s.title}</h3>
                    <ul>
                      {s.features.slice(0, 3).map((f) => (
                        <li key={f}>
                          <Icon name="check" /> {f}
                        </li>
                      ))}
                    </ul>
                    <span className="link-arrow">
                      {dict.common.learnMore} <Icon name="arrow_right_alt" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- selected projects ---------- */}
      <section className="section bg-surf2">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{dict.home.projectsEyebrow}</span>
            <h2>{dict.home.projectsTitle}</h2>
            <p className="lead">{dict.home.projectsLead}</p>
          </div>
          <div className="project-grid">
            {featuredProjects.map((proj) => (
              <Reveal key={proj.slug}>
                <Link className="project-card" href={projectPath(locale, proj.slug)}>
                  <div className="project-media">
                    <span className={`chip ${proj.chipKind === "bsl" ? "chip--bsl" : "chip--std"} type-chip`}>
                      {proj.typeChip}
                    </span>
                    {proj.video && <video muted loop playsInline preload="none" src={proj.video} />}
                    <span className="ph-label">PHOTO · {proj.photoLabel}</span>
                  </div>
                  <div className="project-body">
                    <h3>{proj.name}</h3>
                    <div className="project-meta">
                      <Icon name="location_on" /> {proj.location} · {proj.type}
                    </div>
                    <span className="link-arrow">
                      {dict.common.viewCaseStudy} <Icon name="arrow_right_alt" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <p style={{ marginTop: 32 }} className="center">
            <Link className="btn btn-outline" href={p(paths.projects)}>
              {dict.common.viewAllProjects} <Icon name="arrow_forward" />
            </Link>
          </p>
        </div>
      </section>

      {/* ---------- how we deliver ---------- */}
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

      {/* ---------- why masarat ---------- */}
      <section className="section bg-surf2">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{dict.home.whyEyebrow}</span>
            <h2>{dict.home.whyTitle}</h2>
          </div>
          <div className="pillars">
            {pillars.map((pill) => (
              <Reveal key={pill.title} className="pillar">
                <div className="ic">
                  <Icon name={pill.icon} />
                </div>
                <h3>{pill.title}</h3>
                <p>{pill.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- standards ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{dict.home.standardsEyebrow}</span>
            <h2>{dict.home.standardsTitle}</h2>
          </div>
          <Reveal className="standards-grid">
            {standards.map((s) => (
              <div className="standard" key={s.code}>
                <b>{s.code}</b>
                <span>{s.note}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
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
