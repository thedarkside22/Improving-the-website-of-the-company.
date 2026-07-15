import { defineType, defineField } from "./_helpers";

/** A project / case study — the /work content, editable per-locale. */
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title.en", maxLength: 96 } }),
    defineField({ name: "client", title: "Client", type: "string" }),
    defineField({ name: "location", title: "Location", type: "localeString" }),
    defineField({ name: "type", title: "Type", type: "localeString" }),
    defineField({ name: "typeChip", title: "Type chip", type: "string" }),
    defineField({
      name: "chipKind",
      title: "Chip kind",
      type: "string",
      options: { list: [{ title: "Biocontainment (red)", value: "bsl" }, { title: "Standard (navy)", value: "std" }] },
      initialValue: "std",
    }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "standards", title: "Standards", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", title: "Featured on home", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Sort order", type: "number" }),
    defineField({ name: "heroVideo", title: "Hero video", type: "file", options: { accept: "video/*" } }),
    defineField({ name: "summary", title: "Summary", type: "localeText" }),
    defineField({ name: "overview", title: "Overview paragraphs", type: "array", of: [{ type: "localeText" }] }),
    defineField({
      name: "scope",
      title: "Scope of work",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icon", type: "string" },
            { name: "title", title: "Title", type: "localeString" },
            { name: "body", title: "Body", type: "localeText" },
          ],
        },
      ],
    }),
    defineField({ name: "gallery", title: "Gallery", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "client" },
  },
});
