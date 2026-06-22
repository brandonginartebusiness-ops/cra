"use client";

import ReactDOM from "react-dom";

// Establishes early connections to third-party origins TrackingScripts.tsx
// loads from later, so the DNS/TLS handshake isn't on the critical path when
// those scripts actually fire.
export default function PreconnectHints() {
  ReactDOM.preconnect("https://www.googletagmanager.com");
  ReactDOM.preconnect("https://www.google-analytics.com");
  ReactDOM.preconnect("https://connect.facebook.net");
  ReactDOM.preconnect("https://www.facebook.com");
  return null;
}
