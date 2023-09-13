/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import { ChakraProvider } from "@chakra-ui/react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { DefaultSeo } from "next-seo";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

import defaultSEOConfig from "../../next-seo.config";
// import Layout from "lib/layout";
// import * as gtag from "../lib/data/gtag";
// import mautic from "../lib/data/mt";
import { store } from "../lib/redux/store";
import theme from "../theme/theme";
import * as fbq from "../utils/fpixel";
import { TripSearchProvider } from "contexts/TripSearchContext";
import "../../public/css/App.css";
import "../../public/css/Map.css";

const MyApp = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  const [sendinblueLoaded, setSendinblueLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    posthog.init(`${process.env.NEXT_PUBLIC_POSTHOG_KEY}`, {
      api_host: `${process.env.NEXT_PUBLIC_POSTHOG_HOST}`,
      autocapture: false,
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") posthog.debug();
      },
    });
  }, []);

  // Check that PostHog is client-side (used to handle Next.js SSR)
  // if (typeof window !== "undefined") {
  //   posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
  //     api_host:
  //       process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
  //     // Enable debug mode in development
  //     loaded: (posthog) => {
  //       if (process.env.NODE_ENV === "development") posthog.debug();
  //     },
  //   });
  // }

  useEffect(() => {
    const handleRouteChange = (url) => {
      // gtag.pageview(url);
      // mautic.pageView({ url });
      if (!url.includes("/dive_sites/") && !url.includes("/dive_centres/")) {
        // alert('URL should not have "dive_sites" in it');
        posthog.capture("$pageview");
      }
      fbq.pageview();
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      {/* <Script
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
      /> */}
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
      <Script
        id="script-sendinblue"
        strategy="afterInteractive"
        onReady={() => {
          // using onReady because onLoad doesn't fire for inline scripts
          setSendinblueLoaded(true);
        }}
        dangerouslySetInnerHTML={{
          /* the code below is provided by Sendinblue */
          __html: `
        (function() {
          window.sib = {
              equeue: [],
              client_key: "5jhg8jrrc75q3sj0uq2pctlg"
          };
          /* OPTIONAL: email for identify request*/
          // window.sib.email_id = 'example@domain.com';
          window.sendinblue = {};
          for (var j = ['track', 'identify', 'trackLink', 'page'], i = 0; i < j.length; i++) {
          (function(k) {
              window.sendinblue[k] = function() {
                  var arg = Array.prototype.slice.call(arguments);
                  (window.sib[k] || function() {
                          var t = {};
                          t[k] = arg;
                          window.sib.equeue.push(t);
                      })(arg[0], arg[1], arg[2], arg[3]);
                  };
              })(j[i]);
          }
          var n = document.createElement("script"),
              i = document.getElementsByTagName("script")[0];
          n.type = "text/javascript", n.id = "sendinblue-js", n.async = !0, n.src = "https://sibautomation.com/sa.js?key=" + window.sib.client_key, i.parentNode.insertBefore(n, i), window.sendinblue.page();
        })();
        `,
        }}
      />
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <ChakraProvider theme={theme}>
          <Provider store={store}>
            <PostHogProvider client={posthog}>
              <TripSearchProvider>
                <Head>
                  <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                  />
                </Head>
                <DefaultSeo {...defaultSEOConfig} />
                {getLayout(<Component {...pageProps} />)}
                <Analytics />
              </TripSearchProvider>
            </PostHogProvider>
          </Provider>
        </ChakraProvider>
      </SessionContextProvider>
    </>
  );
};

export default MyApp;
