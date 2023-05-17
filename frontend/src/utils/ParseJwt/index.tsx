export function parseJwt(token: string) {
  if (token) {
    var tokens = token.split(".");

    if (tokens[1]) {
      return JSON.parse(Buffer.from(tokens[1], "base64").toString());
    }
  }
  return null;
}
