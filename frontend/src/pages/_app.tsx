import { AuthProvider } from "~/context/global/AuthContext";
import { ToastContainer } from "react-toastify";
import "../assets/styles/base/base.css";

//PrimeReact
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "../components/local/LocalDataTable/primeDataTable.css"; //local table
import "../components/ui/Pagination/pagination.css";

//ReactToastify
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "~/context/global/UserContext";
import { ThemeProvider } from "~/context/global/ThemeContext";

function MyApp({ Component, pageProps }) {
  return (
    <div className="App">
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
      <ToastContainer autoClose={8000} />
    </div>
  );
}

export default MyApp;
