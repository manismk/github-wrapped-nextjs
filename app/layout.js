"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </body>
    </html>
  );
}
