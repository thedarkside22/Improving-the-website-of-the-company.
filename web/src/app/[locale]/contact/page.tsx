import type { Metadata } from "next";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  const facts = [
    { icon: "call", label: dict.contact.phone, value: site.phone, href: `tel:${site.phoneHref}` },
    { icon: "mail", label: dict.contact.email, value: site.email, href: `mailto:${site.email}` },
    {
      icon: "location_on",
      label: dict.contact.address,
      value: locale === "ar" ? site.addressAr : site.address,
      href: site.mapUrl,
    },
    { icon: "schedule", label: dict.contact.hours, value: site.hours },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="tech-grid--dark" />
        <div className="wrap">
          <span className="eyebrow">{dict.contact.eyebrow}</span>
          <h1>{dict.contact.title}</h1>
          <p>{dict.contact.lead}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="contact-grid">
            <div className="card" style={{ padding: 32 }}>
              <ContactForm dict={dict} />
            </div>
            <div>
              <div className="contact-facts">
                {facts.map((f) => (
                  <div className="contact-fact" key={f.label}>
                    <Icon name={f.icon} />
                    <div>
                      <b>{f.label}</b>
                      {f.href ? (
                        <a href={f.href} target={f.icon === "location_on" ? "_blank" : undefined} rel="noopener noreferrer">
                          <span>{f.value}</span>
                        </a>
                      ) : (
                        <span>{f.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="muted" style={{ marginTop: 24, fontSize: ".9rem" }}>
                {dict.common.requestOnly}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
