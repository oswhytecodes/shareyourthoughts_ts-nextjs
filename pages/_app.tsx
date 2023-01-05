import type { AppProps } from "next/app";
import "../styles/globals.css";
import Header from "../components/header/Header";
import { SessionProvider } from "next-auth/react";
import { ThemeContextProvider, UserNameContext } from "../context/AppContext";
import { useState } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {

  return (
    <ThemeContextProvider>
    
        <SessionProvider session={session}>
          <Header />
          <Component {...pageProps} />
        </SessionProvider>
    </ThemeContextProvider>
  );
}
