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

function MyApp({ Component, pageProps }) {
  return (
    <div className="App">
      <Component {...pageProps} />
      <ToastContainer autoClose={8000} />
    </div>
  );
}

export default MyApp;
