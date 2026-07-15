import { defineType, defineField } from "./_helpers";

/** Per-document SEO overrides — editable by staff without touching code. */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Meta title", type: "localeString" }),
    defineField({ name: "description", title: "Meta description", type: "localeText" }),
    defineField({ name: "ogImage", title: "Social share image", type: "image" }),
    defineField({ name: "noIndex", title: "Hide from search engines", type: "boolean" }),
  ],
});
