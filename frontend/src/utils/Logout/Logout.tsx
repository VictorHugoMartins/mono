import RemoveAuthToken from "../AuthToken/RemoveAuthToken";

async function Logout(ctx?: any) {
  await RemoveAuthToken(ctx);
  localStorage.clear();
  window.location.assign("/login");
}

export default Logout;
