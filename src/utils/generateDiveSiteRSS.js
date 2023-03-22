/* eslint-disable import/no-extraneous-dependencies */
import { Feed } from "feed";
import fs from "fs";

export default async function generateRssFeed(dive_sites) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const activeSites = dive_sites.filter((site) => {
    return (
      site.description !== null &&
      site.latitude !== null &&
      site.longitude !== null &&
      site.dive_map !== null &&
      site.id !== 1
    );
  });

  const feedOptions = {
    title: "Coral Playground | Dive Sites | RSS Feed",
    description:
      "Welcome to Coral Playground, your best source for dive site info in the Red Sea",
    id: siteUrl,
    link: siteUrl,
    favicon: `${siteUrl}/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Coral Playground`,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteUrl}/rss2.xml`,
    },
  };

  const feed = new Feed(feedOptions);

  activeSites.forEach((site) => {
    feed.addItem({
      title: site.name,
      id: `${siteUrl}/diving/dive_sites/${site.id}`,
      link: `${siteUrl}/diving/dive_sites/${site.id}`,
      image: site.dive_map,
      description: site.description,
      // date: new Date(frontmatter.date),
    });
  });

  fs.writeFileSync("./public/rss2.xml", feed.rss2());
}
