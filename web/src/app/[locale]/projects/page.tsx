import type { Metadata } from "next";
import Link from "next/link";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { projectPath } from "@/lib/routes";
import { projects } from "@/content/projects";
import { Icon } from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <section className="page-hero">
        <div className="tech-grid--dark" />
        <div className="wrap">
          <span className="eyebrow">{dict.home.projectsEyebrow}</span>
          <h1>{dict.home.projectsTitle}</h1>
          <p>{dict.home.projectsLead}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="project-grid">
            {projects.map((proj) => (
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
        </div>
      </section>
    </>
  );
}
