/**
 * Creates a unique id to distinguish parallax elements.
 * @return {Number}
 */

let id = 0;

export function createId() {
    ++id;
    return id;
}
