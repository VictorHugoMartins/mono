export function GroupByKey<T>(array: T[], key: string) {
  let response = array.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});

  return response;
}
