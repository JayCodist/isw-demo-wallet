/**
 * Filters out falsy values in an array.
 * Use this instead of `Boolean` in `filter(Boolean)`
 */

export const BooleanFilter = <T>(value: T): value is NonNullable<T> => {
  return Boolean(value);
};

/**
 * Makes all properties in T optional, property values are the supplied type (optional) or `any`
 */
export type PartialLoose<T, V = any> = {
  [P in keyof T]?: V;
};
