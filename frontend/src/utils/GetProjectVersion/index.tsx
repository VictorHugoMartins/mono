import packageJson from "../../../package.json";

export function GetProjectVersion() {
  if (packageJson.version) return packageJson.version;
  return "";
}
