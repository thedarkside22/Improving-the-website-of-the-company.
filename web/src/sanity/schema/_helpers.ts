/**
 * Local stand-ins for Sanity's defineType / defineField so the schema files are
 * self-contained and build without the (heavy) `sanity` Studio package.
 *
 * When you scaffold the Studio, replace this import in each schema with:
 *     import { defineType, defineField } from "sanity";
 * The object shapes below are already Studio-compatible.
 */
export type SchemaField = Record<string, unknown>;
export type SchemaType = Record<string, unknown>;

export const defineField = <T extends SchemaField>(field: T): T => field;
export const defineType = <T extends SchemaType>(type: T): T => type;
