export default function isInDateFormat(str: any) {
  if ( !isNaN(str) ) return false;
  var t = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (t === null)
    return false;
  var d = +t[1], m = +t[2], y = +t[3];

  // Below should be a more acurate algorithm
  if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
    return true;
  }

  return false;
}