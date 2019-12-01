const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join("");

const isArray = val =>
  Object.prototype.toString.apply(val) === "[object Array]";

export { capitalize, isArray };
