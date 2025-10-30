import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <Suspense
    fallback={
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    }
  >
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </Suspense>
  // {/* </React.StrictMode> */}
);
