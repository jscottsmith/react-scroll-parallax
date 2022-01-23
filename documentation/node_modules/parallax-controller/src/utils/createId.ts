/**
 * Creates a unique id to distinguish parallax elements.
 */

let id = 0;

export function createId(): number {
  ++id;
  return id;
}
