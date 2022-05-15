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
// import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <DefaultSeo {...defaultSEOConfig} />
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    </ChakraProvider>
  );
};

export default MyApp;
