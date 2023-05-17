export function identifyLevel(element, classname: string) {
  //
  // If we are here we didn't find the searched class in any parents node
  //
  if (!element.parentNode) return 0;
  //
  // If the current node has the class return true, otherwise we will search
  // it in the parent node
  //
  if (element.className.split(' ').indexOf(classname) >= 0) return 1 + identifyLevel(element.parentNode, classname);
  return identifyLevel(element.parentNode, classname);
}