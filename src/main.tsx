import { createRoot } from "react-dom/client";
import { App } from "./App";

const rootElement = document.querySelector("#content");

if (rootElement !== null) {
    console.log("main.tsx")
    createRoot(rootElement).render(<App />);
} else {
    console.error("Root element not found.");
}
