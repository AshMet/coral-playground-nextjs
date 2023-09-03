/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Box,
  Heading,
  Link,
  Text,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import ShareButtons from "components/footer/ShareButtons";
import BlogAuthor from "components/pages/blog/BlogAuthor";
import BlogTags from "components/pages/blog/BlogTags";
import DivingLayout from "layouts/DivingLayout";

export async function getStaticPaths() {
  const files = fs.readdirSync("src/lib/data/posts");
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const fileName = fs.readFileSync(`src/lib/data/posts/${slug}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  };
}

export default function BlogPost({ frontmatter, content, slug }) {
  return (
    <>
      <NextSeo
        title={`Blog | ${frontmatter.title}`}
        description={frontmatter.metaDesc}
        canonical="https://www.coralplayground.com/blog"
        openGraph={{
          title: `Blog | ${frontmatter.title}`,
          description: frontmatter.metaDesc,
          type: "article",
          article: {
            publishedTime: frontmatter.date,
            modifiedTime: frontmatter.date,
            authors: ["https://www.coralplayground.com/users/@scubasteve"],
            tags: frontmatter.tags,
          },
          url: `https://www.coralplayground.com/blog/${slug}`,
          images: [
            {
              url: frontmatter.socialImage,
              width: 850,
              height: 650,
              alt: frontmatter.title,
            },
          ],
        }}
      />
      <Container maxW="7xl" p="12">
        <Text
          as="h2"
          fontSize="5xl"
          fontWeight="bold"
          textAlign="center"
          mb={10}
          color={useColorModeValue("brand.blue", "brand.yellow")}
          mt="100px"
        >
          {frontmatter.title}
        </Text>
        <Box
          marginTop={{ base: "1", sm: "5" }}
          display="flex"
          flexDirection={{ sm: "column", md: "row" }}
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flex="1"
            marginRight="3"
            position="relative"
            alignItems="center"
          >
            <Box
              width={{ base: "100%", sm: "85%" }}
              minH="200px"
              zIndex="2"
              marginLeft={{ base: "0", sm: "5%" }}
              marginTop="5%"
            >
              <Link
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
                borderRadius="lg"
                width="600"
                height="525"
              >
                <Image
                  src={`/${frontmatter.socialImage}`}
                  alt="Blog Post Image"
                  objectFit="cover"
                  borderRadius="xl"
                  layout="fill"
                />
              </Link>
            </Box>
            <Box zIndex="1" width="100%" position="absolute" height="100%">
              <Box
                bgGradient={useColorModeValue(
                  "radial(orange.600 1px, transparent 1px)",
                  "radial(orange.300 1px, transparent 1px)"
                )}
                backgroundSize="20px 20px"
                opacity="0.4"
                height="100%"
              />
            </Box>
          </Box>
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: "3", sm: "0" }}
          >
            <Heading marginTop="1">
              {/* <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              Benefits of Custom Mouth Guards
            </Link> */}
            </Heading>
            <BlogTags tags={frontmatter.tags} />
            <Text
              as="p"
              marginTop="2"
              color={useColorModeValue("gray.700", "gray.200")}
              fontSize="lg"
            >
              {frontmatter.summary}
            </Text>
            <BlogAuthor
              name={frontmatter.author}
              date={new Date(frontmatter.date)}
            />
          </Box>
        </Box>
        <ReactMarkdown
          components={ChakraUIRenderer()}
          children={content}
          skipHtml
        />
        <ShareButtons />
      </Container>
    </>
  );
}

BlogPost.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
