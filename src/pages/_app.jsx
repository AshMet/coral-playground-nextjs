/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { DefaultSeo } from "next-seo";
import posthog from "posthog-js";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

import defaultSEOConfig from "../../next-seo.config";
// import Layout from "lib/layout";
import * as gtag from "../lib/data/gtag";
import mautic from "../lib/data/mt";
import { store } from "../lib/redux/store";
import theme from "../theme/theme";
import * as fbq from "../utils/fpixel";
import "../../public/css/App.css";
import "../../public/css/Map.css";

const MyApp = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  useEffect(() => {
    mautic.initialize("https://mautic.chondrohub.dscloud.me/mtc.js");
    posthog.init("phc_eh7TvObhukSTsvOP2TXEDzxDskVHLo8Xt2EhbawijcC", {
      api_host: "https://app.posthog.com",
      // loaded: (posthog) => {
      //   if (process.env.NODE_ENV === "development") posthog.opt_out_capturing();
      // },
    });
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
      mautic.pageView({ url });
      posthog.capture("$pageview");
      fbq.pageview();
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
      <Script
        id="metricoolScript"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"7ae02e7a19e343c1d009847b3ab506ce"})});
          `,
        }}
      />
      {/* Global Site Code Pixel - Facebook Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
          `,
        }}
      />
      <Script
        src="//widget.manychat.com/526229_5f573.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://mccdn.me/assets/js/widget.js"
        strategy="lazyOnload"
      />
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <ChakraProvider theme={theme}>
          <Provider store={store}>
            <Head>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
              />
            </Head>
            <DefaultSeo {...defaultSEOConfig} />
            {getLayout(<Component {...pageProps} />)}
            <Analytics />
          </Provider>
        </ChakraProvider>
      </SessionContextProvider>
    </>
  );
};

export default MyApp;
