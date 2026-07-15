/**
 * GROQ queries for the content the editors manage. Localized fields return
 * both languages; the app picks the active locale at render time.
 */
export const projectsQuery = /* groq */ `
  *[_type == "project"] | order(featured desc, _createdAt asc){
    "slug": slug.current,
    title, client, location, type, typeChip, chipKind, year, standards,
    featured, summary, overview,
    "gallery": gallery[].asset->url
  }
`;

export const projectBySlugQuery = /* groq */ `
  *[_type == "project" && slug.current == $slug][0]{
    "slug": slug.current,
    title, client, location, type, typeChip, chipKind, year, standards,
    featured, summary, overview, scope,
    "gallery": gallery[].asset->url
  }
`;

export const teamQuery = /* groq */ `
  *[_type == "teamMember"] | order(order asc){ name, role, bio, "photo": photo.asset->url }
`;

export const siteSettingsQuery = /* groq */ `*[_type == "siteSettings"][0]`;
