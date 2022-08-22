/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
// import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import { MoralisProvider } from "react-moralis";

import defaultSEOConfig from "../../next-seo.config";
// import Layout from "lib/layout";
import { CoralPgProvider } from "../contexts/CoralPgContext";
import { DivingProvider } from "../contexts/DivingContext";
import * as gtag from "../lib/data/gtag";
import theme from "../theme/theme";
import "../../public/css/App.css";
import "../../public/css/Map.css";
// import AuthCentered from "layouts/auth/types/Centered";
// import AdminLayout from "layouts/admin";

// type ComponentWithPageLayout = AppProps & {
//   Component: AppProps["Component"] & {
//     PageLayout?: React.ComponentType;
//   };
// };

const MyApp = ({ Component, pageProps }) => {
  const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
  const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
  const getLayout = Component.getLayout || ((page) => page);

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtagScript"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <ChakraProvider theme={theme}>
        <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
          <CoralPgProvider>
            <DivingProvider>
              <Head>
                <meta
                  name="viewport"
                  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                />
              </Head>
              <DefaultSeo {...defaultSEOConfig} />
              {getLayout(<Component {...pageProps} />)}
            </DivingProvider>
          </CoralPgProvider>
        </MoralisProvider>
      </ChakraProvider>
    </>
  );
};

export default MyApp;
