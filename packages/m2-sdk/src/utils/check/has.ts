/**
 * Checks if the object has a property with the specified key.
 *
 * @param {object} obj - The object to check for the property.
 * @param {string} key - The key of the property to check for.
 * @return {boolean} Returns true if the object has the property, otherwise false.
 */
export function has(obj: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
