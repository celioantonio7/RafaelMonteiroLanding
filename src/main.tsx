import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "lenis/dist/lenis.css";
import "./i18n"; // Import i18n setup

createRoot(document.getElementById("root")!).render(<App />);
