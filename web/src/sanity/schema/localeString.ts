import { defineType, defineField } from "./_helpers";

/** Reusable English + Arabic string/text objects for localized content. */
export const localeString = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "string" }),
    defineField({ name: "ar", title: "العربية", type: "string" }),
  ],
});

export const localeText = defineType({
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "text", rows: 4 }),
    defineField({ name: "ar", title: "العربية", type: "text", rows: 4 }),
  ],
});
