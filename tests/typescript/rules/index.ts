// 注释

/**
 * zhushi
 */
const __a = 1;

const object = { x: 42, y: 50 };
const entries = Object.entries(object);
// → [['x', 42], ['y', 50]]
console.log("entries", entries);

const result = Object.fromEntries(entries);
// → { x: 42, y: 50 }
console.log("result", result);

export {};
