import { isNumber } from "../IsNumber";

export const ConvertObjectVariablesToNumber = async (object: any) => {
  Object.keys(object).forEach(function (key) {
    if (isNumber(object[key])) object[key] = Number(object[key]);
    else object[key] = object[key];
  });
};

export const ConvertArrayObjectVariablesToNumber = async (array: any[]) => {
  array.map((item) => {
    ConvertObjectVariablesToNumber(item);
  });
};
