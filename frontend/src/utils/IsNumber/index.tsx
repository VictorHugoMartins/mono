const isNumberSimple = function isNumber(value) {
  return typeof value === "number" && isFinite(value);
};

const isNumberObject = function isNumberObject(n) {
  return Object.prototype.toString.apply(n) === "[object Number]";
};

export const isNumber = function isCustomNumber(n) {
  return isNumberSimple(n) || isNumberObject(n);
};
