import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { URL } from "./config";

const HEALTH_CHECK_TIMEOUT_MS = 5000;

async function isBackendValid() {
  const forceMock = import.meta.env.VITE_USE_MOCK === "always";
  if (forceMock) return false;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), HEALTH_CHECK_TIMEOUT_MS);
    const res = await fetch(`${URL}/rooms?health=1`, { signal: controller.signal });
    clearTimeout(timeoutId);
    const contentType = res.headers.get("content-type") || "";
    const ok = res.ok && contentType.includes("application/json");
    return !!ok;
  } catch {
    return false;
  }
}

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  const { worker } = await import("./mocks/browser");
  await worker.start();
  window.__USE_BACKEND__ = await isBackendValid();
}

enableMocking().then(() => {
  ReactDOM.render(<App />, document.getElementById("root"));
});

