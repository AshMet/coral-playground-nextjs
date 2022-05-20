/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";

import defaultSEOConfig from "../../next-seo.config";
// import Layout from "lib/layout";
import theme from "../theme/theme";
import "../../public/css/App.css";
// import "lib/styles/globals.css";
// import AuthCentered from "layouts/auth/types/Centered";
// import AdminLayout from "layouts/admin";

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType;
  };
};

const MyApp = ({ Component, pageProps }: ComponentWithPageLayout) => {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <DefaultSeo {...defaultSEOConfig} />
      {Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        // <AdminLayout>
        <Component {...pageProps} />
        // </AdminLayout>
      )}
    </ChakraProvider>
  );
};

export default MyApp;
