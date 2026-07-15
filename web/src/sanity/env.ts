/**
 * Sanity connection settings, read from env. Until a project is configured the
 * site renders from the typed local content in src/content/* — the CMS is a
 * drop-in upgrade, not a hard dependency.
 */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** True once a Sanity project id is present in the environment. */
export const sanityConfigured = projectId.length > 0;
