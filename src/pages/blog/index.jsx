/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  Text,
  Stack,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import fs from "fs";
import matter from "gray-matter";
import { NextSeo } from "next-seo";

import BlogCard from "components/card/BlogCard";
import DivingLayout from "layouts/DivingLayout";
import generateRssFeed from "utils/generateRSSFeed";

export async function getStaticProps() {
  const files = fs.readdirSync("src/lib/data/posts");

  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`src/lib/data/posts/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);
    return {
      slug,
      frontmatter,
    };
  });
  await generateRssFeed(posts);

  return {
    props: {
      posts,
    },
  };
}

export default function Blog({ posts }) {
  return (
    <>
      <NextSeo
        title="Coral Playground | Scuba Diving Blog"
        description="Find out everything you've ever wanted to know about scuba diving"
        openGraph={{
          type: "website",
          title: "Coral Playground | Scuba Diving Blog",
          description:
            "Find out everything you've ever wanted to know about scuba diving",
          url: "https://www.coralplayground.com/diving/dive_sites/",
          images: [
            {
              url: "https://www.coralplayground.com/img/diving/dive_site_bg.jpg",
              width: 800,
              height: 600,
              alt: "Dive Sites Cover Photo",
            },
          ],
        }}
      />
      <Box id="MgBlogs" mt={50}>
        <Container maxW="7xl" py={16} as={Stack} spacing={12}>
          <Stack spacing={0} align="center">
            <Text
              as="h2"
              fontSize="5xl"
              fontWeight="bold"
              textAlign="center"
              color={useColorModeValue("brand.blue", "brand.yellow")}
            >
              Latest Blog Posts
            </Text>
            <Text as="h2" fontSize="lg" fontWeight="700">
              Your best source for everything related to Scuba Diving
            </Text>
          </Stack>
          <Flex direction={{ sm: "column", lg: "row" }} gap={10}>
            {posts.map(({ slug, frontmatter }) => (
              <BlogCard
                key={slug}
                title={frontmatter.title}
                summary={frontmatter.summary}
                author={frontmatter.author}
                date={frontmatter.date}
                tags={frontmatter.tags}
                articleUrl={`blog/${slug}`}
                imgUrl={`/${frontmatter.socialImage}`}
              />
            ))}
          </Flex>
        </Container>
      </Box>
    </>
  );
}

Blog.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
