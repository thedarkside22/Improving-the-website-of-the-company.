import { defineType, defineField } from "./_helpers";

/** Global, editable site facts (contact, socials, compliance chips). */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp number", type: "string" }),
    defineField({ name: "address", title: "Address", type: "localeString" }),
    defineField({ name: "hours", title: "Hours", type: "localeString" }),
    defineField({ name: "compliance", title: "Compliance chips", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "trustedBy", title: "Trusted by", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "social",
      title: "Social links",
      type: "object",
      fields: [
        { name: "linkedin", type: "url" },
        { name: "x", type: "url" },
        { name: "youtube", type: "url" },
      ],
    }),
  ],
});
