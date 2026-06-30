import { HashRouter } from "react-router-dom";
import "./App.css";
import { AppContext } from "./services/AppContext";

import { ToastContainer } from "react-toastify";
import "src/styles/theme.sass";

import Layout from "./layout/Layout";

function App() {
  return (
    <HashRouter>
      <AppContext>
        <>
          <Layout />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
          />
        </>
      </AppContext>
    </HashRouter>
  );
}

export default App;
