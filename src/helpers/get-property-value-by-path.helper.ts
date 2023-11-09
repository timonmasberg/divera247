/**
 * Get value of a specific property of an object
 * @param obj
 * @param keys Chain of keys
 * @Returns Value of the last property of a chain of object keys or null if property not found
 */
export function getPropertyValueByPath<ReturnT = unknown>(
  obj: Record<string, unknown>,
  ...keys: string[]
): ReturnT {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return keys.reduce((result: any, key: string) => result[key], obj) ?? null;
}
