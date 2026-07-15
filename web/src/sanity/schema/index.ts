import { localeString, localeText } from "./localeString";
import { seo } from "./seo";
import { project } from "./project";
import { teamMember } from "./teamMember";
import { siteSettings } from "./siteSettings";

/**
 * The full schema. When you scaffold a Sanity Studio, pass this to
 * defineConfig({ schema: { types: schemaTypes } }).
 */
export const schemaTypes = [localeString, localeText, seo, project, teamMember, siteSettings];
