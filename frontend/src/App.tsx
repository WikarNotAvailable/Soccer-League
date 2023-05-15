import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { Wrapper } from "./components/global/Wrapper";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Wrapper />
  </ChakraProvider>
);
