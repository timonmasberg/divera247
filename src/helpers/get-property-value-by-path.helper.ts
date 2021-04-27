import {KeyStringObject} from "../endpoints/key-string-object";

/**
 * Get value of a specific property of an object
 * @param obj
 * @param keys Chain of keys
 * @Returns Value of the last property of a chain of object keys or null if property not found
 */

export function getPropertyValueByPath<ObjectType extends KeyStringObject = any, PropertyType = any>(obj: ObjectType, ...keys: string[]): PropertyType {
  return keys.reduce(
    (result: any, key: string) => result[key],
    obj
  ) ?? null;
}
