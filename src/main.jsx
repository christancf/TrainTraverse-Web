import React from "react";
import ReactDOM from "react-dom/client";
import CommonRoute from "./routes/CommonRoutes.jsx";
import "./index.css";
import { Flowbite } from "flowbite-react";
import { trainTraverseTheme } from "../flowbite-theme-config.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Flowbite theme={{ theme: trainTraverseTheme }}>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <CommonRoute />
      </QueryClientProvider>
    </Flowbite>
  </React.StrictMode>
);
