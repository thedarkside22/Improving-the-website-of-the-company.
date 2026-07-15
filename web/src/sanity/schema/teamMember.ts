import { defineType, defineField } from "./_helpers";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "role", title: "Role", type: "localeString" }),
    defineField({ name: "bio", title: "Bio", type: "localeText" }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Sort order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "role.en", media: "photo" } },
});
