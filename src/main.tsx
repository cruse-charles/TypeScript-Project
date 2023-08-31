import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./Theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* Below is wrapped around whole app so that it can apply to all of the app */}
    <ChakraProvider theme={theme}>
      {/* Theme below will be stored in local storage */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
