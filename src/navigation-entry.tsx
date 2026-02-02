import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { useEffect } from "react";
import { NavigationApp } from "./navigation/NavigationApp";
import { BrowserRouter } from "react-router-dom";

// Ensure the navigation-root has the proper class for styling
const navigationRoot = document.getElementById("navigation-root");


// Component to listen for navigation events from other micro-frontends
const NavigationListener = () => {

  useEffect(() => {
    // Event handler for listening for events from the navigation micro-frontend    // Add the event listener
    window.addEventListener(
      "work-availability-change",
// need to update the shared state
    );

    // Clean up
    return () => {
      window.removeEventListener(
        "navigation-change",
        handleNavEvent as EventListener
      );
    };
  }, [navigate]);

  return null;
};
createRoot(navigationRoot!).render(
  <BrowserRouter>
    <NavigationApp />
  </BrowserRouter>
);
