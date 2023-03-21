/* eslint-disable import/no-extraneous-dependencies */
import { Feed } from "feed";
import fs from "fs";

export default async function generateRssFeed(posts) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const feedOptions = {
    title: "Coral Playground | Blog posts | RSS Feed",
    description:
      "Welcome to Coral Playground's blog posts, your definitive guide to everything related to scuba diving",
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/coral-icon.png`,
    favicon: `${siteUrl}/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Coral Playground`,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteUrl}/rss.xml`,
    },
  };

  const feed = new Feed(feedOptions);

  posts.forEach((post) => {
    const { slug, frontmatter } = post;
    feed.addItem({
      title: frontmatter.title,
      id: `${siteUrl}/blog/${slug}`,
      link: `${siteUrl}/blog/${slug}`,
      description: frontmatter.summary,
      content: frontmatter.content,
      date: new Date(frontmatter.date),
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.rss2());
}
