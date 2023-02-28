/* eslint-disable sonarjs/no-duplicate-string */
/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Coral Playground",
  titleTemplate: "%s | Coral Playground",
  defaultTitle: "Coral Playground",
  description: "The best way to book a diving trip in the Red Sea",
  canonical: "https://www.coralplayground.com",
  openGraph: {
    url: "https://www.coralplayground.com",
    title: "Coral Playground",
    description: "The best way to book a diving trip in the Red Sea",
    images: [
      {
        url: "img/diving/4-anemone.jpeg",
        alt: "Coral Playground",
      },
    ],
    site_name: "Coral Playground",
  },
  twitter: {
    handle: "@coralplayground",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
