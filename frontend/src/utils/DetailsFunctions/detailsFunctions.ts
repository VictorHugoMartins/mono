import { InputRenderType } from "~/types/global/InputRenderType";

export function insertNewElementsAtIndex(oldArray: Array<any>, newElements: Array<any>, index: number): Array<any> {
  const x = [
    ...oldArray.slice(0, index),
    ...newElements,
    ...oldArray.slice(index)
  ];
  return x;
}

export function removeClusterParameters(someArray: InputRenderType[]) {
  let x = someArray;
  x = x.filter(function (el: InputRenderType) { return el.name !== "n_clusters" });
  x = x.filter(function (el: InputRenderType) { return el.name !== "threshold" });
  x = x.filter(function (el: InputRenderType) { return el.name !== "branching_factor" });
  x = x.filter(function (el: InputRenderType) { return el.name !== "init" });
  x = x.filter(function (el: InputRenderType) { return el.name !== "n_init" });
  x = x.filter(function (el: InputRenderType) { return el.name !== "min_samples" });
  x = x.filter(function (el: InputRenderType) { return el.name !== "eps" });
  return x;
}

export function removeClusterParameterInput(someArray: InputRenderType[]) {
  let x = someArray;
  x = x.filter(function (el: InputRenderType) { return el.name !== "cluster_parameters" });
  return x;
}