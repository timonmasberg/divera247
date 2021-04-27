import {KeyStringObject} from "../endpoints/key-string-object";

/**
 * Sorts an objects by its keys and a provided ranking of keys
 * @param object Object to sort
 * @param {string[]} keyRanking Keys of object where the index of the key represent its order
 * @return Provided object with sorted keys
 */
export function sortObjectsByKeyRanking<ObjectType extends KeyStringObject>(object: ObjectType, keyRanking: string[]): ObjectType {
  const objectKeys = Object.keys(object);

  // todo: check how validating might be handleable through type declaration
  if (objectKeys.length !== keyRanking.length) {
    throw new Error('Ranking has to be provided for every key');
  }

  const hasInvalidKeys = objectKeys.some(key => !keyRanking.includes(key))
  if (hasInvalidKeys) {
    throw new Error("Invalid or missing keys in ranking");
  }

  return objectKeys
    .sort((idA, idB) => {
      const rankOfA = keyRanking.findIndex(id => id === idA);
      const rankOfB = keyRanking.findIndex(id => id === idB);

      return rankOfA - rankOfB;
    })
    .reduce((r, k) =>
      Object.assign(r, {[k]: object[k]}), {} as ObjectType);
}
