import { createRoot } from "react-dom/client";
import "@/assets/index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { BrowserRouter } from "react-router-dom";
import App from "./pages/App";

library.add(fas, far, fab);
config.styleDefault = "fa-solid";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
