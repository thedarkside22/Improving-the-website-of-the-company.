import { createClient, type SanityClient } from "@sanity/client";
import { apiVersion, dataset, projectId, sanityConfigured } from "./env";

/**
 * A read client, or null when Sanity isn't configured yet. Callers should fall
 * back to local content (see src/content/*) when this is null.
 */
export const sanityClient: SanityClient | null = sanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;
