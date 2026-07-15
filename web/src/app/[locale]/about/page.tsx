import type { Metadata } from "next";
import Link from "next/link";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { paths, localePath } from "@/lib/routes";
import { site, standards } from "@/content/site";
import { team, values } from "@/content/team";
import { Icon } from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "About" };

const areas = [
  {
    icon: "architecture",
    title: "Controlled Environment Solutions",
    body: "Cleanrooms, GMP suites and BSL-3/4 biocontainment — designed, engineered and built to pass inspection.",
  },
  {
    icon: "science",
    title: "Laboratory & Safety Products",
    body: "Biological safety cabinets, fume hoods, lab equipment and cleanroom systems, matched to the work.",
  },
  {
    icon: "fact_check",
    title: "Technical Services",
    body: "Commissioning, qualification & validation, certification and planned preventive maintenance.",
  },
];

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const p = (path: string) => localePath(locale, path);

  return (
    <>
      <section className="page-hero">
        <div className="tech-grid--dark" />
        <div className="wrap">
          <span className="eyebrow">{dict.nav.about}</span>
          <h1>Because critical spaces protect more than operations</h1>
          <p>
            Since {site.founded}, Masarat has helped the Kingdom&apos;s leading institutions create environments they can
            trust — for patients, for people, and for research.
          </p>
        </div>
      </section>

      {/* mission */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">Our mission</span>
              <h2>We help clients create environments they can trust</h2>
              <p className="lead">
                A Saudi company founded in {site.founded}, Masarat specialises in cleanroom solutions (Cleanrooms &amp;
                GMP) and high-risk laboratories (BSL-3 &amp; 4). We bring the engineers, the standards expertise and the
                people to take a controlled environment from concept to full compliance — and to keep it that way.
              </p>
              <p className="lead">Clear from the beginning. Careful until the end.</p>
            </div>
            <Reveal>
              <div className="media-frame">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: "url('/media/wwd-test.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* what we do areas */}
      <section className="section bg-surf2">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">What we do</span>
            <h2>Three connected capabilities</h2>
          </div>
          <div className="pillars">
            {areas.map((a) => (
              <Reveal key={a.title} className="pillar">
                <div className="ic">
                  <Icon name={a.icon} />
                </div>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* values */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">How we work</span>
            <h2>The way we work matters as much as what we deliver</h2>
          </div>
          <div className="pillars">
            {values.map((v) => (
              <Reveal key={v.title} className="pillar">
                <div className="ic">
                  <Icon name={v.icon} />
                </div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* team */}
      <section className="section bg-surf2">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Our team</span>
            <h2>Critical environments are delivered by people first</h2>
          </div>
          <div className="wwd-grid">
            {team.map((member) => (
              <Reveal key={member.name} className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ aspectRatio: "4 / 3", overflow: "hidden", background: "var(--surface-2)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.photo}
                    alt={member.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    width={400}
                    height={300}
                  />
                </div>
                <div style={{ padding: "22px 24px 26px" }}>
                  <h3 style={{ marginBottom: 2 }}>{member.name}</h3>
                  <div className="eyebrow" style={{ margin: "0 0 12px" }}>
                    {member.role}
                  </div>
                  <p className="muted" style={{ margin: 0, fontSize: ".95rem" }}>
                    {member.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* standards */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Standards &amp; credentials</span>
            <h2>Standards help turn trust into evidence</h2>
          </div>
          <Reveal className="standards-grid">
            {standards.map((s) => (
              <div className="standard" key={s.code}>
                <b>{s.code}</b>
                <span>{s.note}</span>
              </div>
            ))}
          </Reveal>
          <p className="muted center" style={{ marginTop: 20 }}>
            {dict.common.requestOnly}
          </p>
        </div>
      </section>

      <section className="cta-band">
        <div className="tech-grid--dark" />
        <div className="wrap">
          <h2>Let&apos;s talk about what your environment needs</h2>
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
