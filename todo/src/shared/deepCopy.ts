export function deepCopy(object: Object) {
  return JSON.parse(JSON.stringify(object));
}
