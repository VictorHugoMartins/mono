export function convertRgbaToHex(rgba: string, isOnlyNumbers?: boolean) {
  const rgbaValues = rgba
    .substring(
      isOnlyNumbers ? 0 : 5,
      isOnlyNumbers ? rgba.length : rgba.length - 1
    )
    .split(",");

  const hexColor = rgbaToHex(
    parseInt(rgbaValues[0]),
    parseInt(rgbaValues[1]),
    parseInt(rgbaValues[2])
  );
  return hexColor;
}

function rgbaToHex(r, g, b, a = "") {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  // a = Math.round(a * 255).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;
  // if (a.length == 1) a = "0" + a;

  return "#" + r + g + b;
}
