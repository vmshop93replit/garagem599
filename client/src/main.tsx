import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initVersionCheck } from "./lib/version-check";

initVersionCheck();

createRoot(document.getElementById("root")!).render(<App />);
