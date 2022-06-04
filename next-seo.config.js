/* eslint-disable sonarjs/no-duplicate-string */
/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Coral Playground",
  titleTemplate: "%s | Coral Playground",
  defaultTitle: "Coral Playground",
  description: "Welcome to the Ocean Metaverse",
  canonical: "https://www.coralplayground.com",
  openGraph: {
    url: "https://www.coralplayground.com",
    title: "Coral Playground",
    description: "Welcome to the Ocean Metaverse",
    images: [
      {
        url: "https://www.newsecuritybeat.org/wp-content/uploads/2020/12/shutterstock_737988934-645x430.jpg",
        alt: "Coral Playground",
      },
    ],
    site_name: "Coral Playground",
  },
  twitter: {
    handle: "@AshMetwalli",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
