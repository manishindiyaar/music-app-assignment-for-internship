import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";

const mount = (element) => {
  const root = createRoot(element || document.getElementById('root'));
  root.render(<App />);
};

// If we are in development or standalone mode and the container element exists, render immediately
if (process.env.NODE_ENV === 'development' || !window.containerContext) {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    mount(rootElement);
  }
}

// We are running through container, export the mount function
export { mount };