import "../styles/index.css";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
