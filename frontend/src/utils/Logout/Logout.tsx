import RemoveAuthToken from "../AuthToken/RemoveAuthToken";
import RedirectTo from "../Redirect/Redirect";

async function Logout(ctx?: any) {
  await RemoveAuthToken(ctx);
  // localStorage.clear();
  window.location.assign("/login");
}

export default Logout;
