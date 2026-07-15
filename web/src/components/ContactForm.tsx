"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/config";
import { Icon } from "@/components/ui/Icon";

/**
 * Front-end-only contact form. It validates and shows a success state but does
 * not transmit data — wire it to a CRM / email service (or a Next route
 * handler + WP Mail SMTP replacement) before launch.
 */
export default function ContactForm({ dict }: { dict: Dictionary }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="form-success" role="status">
        <Icon name="check_circle" /> {dict.contact.success}
      </div>
    );
  }

  return (
    <form
      className="form-grid"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="field">
        <label htmlFor="cf-name">{dict.contact.name}</label>
        <input id="cf-name" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="cf-email">{dict.contact.email}</label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="cf-org">{dict.contact.organisation}</label>
        <input id="cf-org" name="organisation" autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="cf-msg">{dict.contact.message}</label>
        <textarea id="cf-msg" name="message" required />
      </div>
      <button className="btn btn-primary" type="submit">
        {dict.contact.send} <Icon name="arrow_forward" />
      </button>
      <p className="form-note">{dict.contact.demoNote}</p>
    </form>
  );
}
