import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { paths, localePath, projectPath } from "@/lib/routes";
import { projects, getProject } from "@/content/projects";
import { Icon } from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project ? project.name : "Project" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const p = (path: string) => localePath(locale, path);
  const related = projects.filter((x) => x.slug !== project.slug).slice(0, 2);

  const facts = [
    { label: "Client", value: project.client },
    { label: "Location", value: project.location },
    { label: "Type", value: project.type },
    { label: "Year", value: project.year },
    { label: "Standards", value: project.standards.join(" · ") },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="tech-grid--dark" />
        <div className="wrap">
          <nav className="muted" style={{ fontSize: ".9rem", marginBottom: 14, color: "rgba(255,255,255,.7)" }}>
            <Link href={p(paths.home)} style={{ color: "inherit" }}>
              Home
            </Link>{" "}
            /{" "}
            <Link href={p(paths.projects)} style={{ color: "inherit" }}>
              {dict.nav.projects}
            </Link>{" "}
            / {project.client}
          </nav>
          <div className="chip-row" style={{ marginBottom: 16 }}>
            <span className={`chip ${project.chipKind === "bsl" ? "chip--bsl" : "chip--std"}`}>{project.typeChip}</span>
          </div>
          <h1>{project.name}</h1>
          <p>{project.summary}</p>
        </div>
      </section>

      {/* facts */}
      <section className="section--tight bg-surf2">
        <div className="wrap">
          <div className="stats-band" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
            {facts.map((f) => (
              <div className="item" key={f.label}>
                <div className="stat-label" style={{ marginTop: 0, marginBottom: 6 }}>
                  {f.label}
                </div>
                <div style={{ fontWeight: 600, color: "var(--navy-ink)" }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* overview */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">Overview</span>
              <h2>{project.overviewTitle}</h2>
              {project.overview.map((para, i) => (
                <p className="lead" key={i}>
                  {para}
                </p>
              ))}
            </div>
            <Reveal>
              <div className="media-frame">
                {project.video ? (
                  <video muted loop autoPlay playsInline preload="none" src={project.video} />
                ) : (
                  <span>PHOTO · {project.photoLabel}</span>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* scope */}
      <section className="section bg-surf2">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Scope of work</span>
            <h2>What we delivered</h2>
          </div>
          <div className="pillars">
            {project.scope.map((item) => (
              <Reveal key={item.title} className="pillar">
                <div className="ic">
                  <Icon name={item.icon} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* gallery placeholders */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Gallery</span>
            <h2>On site</h2>
            <p className="lead">Photos are placeholders — attach the real project images to drop them in.</p>
          </div>
          <div className="project-grid">
            {project.gallery.map((g) => (
              <div className="media-frame" key={g} style={{ aspectRatio: "16 / 11" }}>
                <span>PHOTO · {g}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* standards + documentation */}
      <section className="section bg-surf2">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">Standards met</span>
              <h2>Compliance</h2>
              <div className="chip-row" style={{ marginBottom: 16 }}>
                {project.standards.map((s) => (
                  <span className="chip chip--std" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              <p className="muted">
                The applicable standard, traceable instrument calibration and the service report/certificate are the
                prominent deliverables for any containment certification.
              </p>
            </div>
            <div>
              <span className="eyebrow">Certificates &amp; reports</span>
              <h2>Documentation</h2>
              <div className="card">
                <div className="ic">
                  <Icon name="description" />
                </div>
                <h3>Validation &amp; certification report</h3>
                <p>{dict.common.requestOnly}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* related */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Related projects</span>
            <h2>More of our work</h2>
          </div>
          <div className="project-grid">
            {related.map((proj) => (
              <Link key={proj.slug} className="project-card" href={projectPath(locale, proj.slug)}>
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
                    <Icon name="location_on" /> {proj.location}
                  </div>
                  <span className="link-arrow">
                    {dict.common.viewCaseStudy} <Icon name="arrow_right_alt" />
                  </span>
                </div>
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
              {dict.common.viewAllProjects}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
