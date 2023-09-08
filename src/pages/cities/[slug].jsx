/* eslint-disable react/no-children-prop */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { Box, Flex, Text } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import DivingLayout from "layouts/DivingLayout";
import { supabase } from "pages/api";

export default function Cities({ city }) {
  return (
    <Box mx={{ lg: "50px" }}>
      <Flex
        mb={{ base: "20px", "2xl": "20px" }}
        justifyContent="center"
        align="center"
        direction="column"
        w="100%"
      >
        <Box
          w={{
            sm: "100%",
            md: "100",
            lg: "800px",
            xl: "100%",
            "2xl": "745px",
          }}
          h={{
            sm: "100%",
            md: "100%",
            lg: "200px",
            xl: "200px",
            "2xl": "745px",
          }}
          mb="26px"
          align
          mx={{ sm: "auto", lg: "auto", xl: "0px" }}
          mt="100px"
          borderRadius="10px"
          overflow="hidden"
          justify="center"
        >
          <Image
            src={`/img/cities/${city.slug.replaceAll("-", "_")}_banner.webp`}
            width="1080px"
            height="200px"
            layout="responsive"
          />
        </Box>
        <Text
          as="h1"
          fontSize={{ sm: "36", md: "54px" }}
          fontWeight="700"
          mb="15px"
          lineHeight="100%"
        >
          {city.name}
        </Text>
      </Flex>
      <Flex
        mb={{ base: "20px", "2xl": "20px" }}
        justifyContent="start"
        align="start"
        direction="column"
        w="100%"
      >
        <ReactMarkdown
          components={ChakraUIRenderer()}
          children={city.description}
          skipHtml
        />
      </Flex>
    </Box>
  );
}

export const getStaticPaths = async () => {
  const { data: cities } = await supabase.from("cities").select("slug");

  const paths = cities.map(({ slug }) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const { data: city } = await supabase
    .from("cities")
    .select("*")
    .match({ slug })
    .single();

  return {
    props: {
      city,
    },
    revalidate: 86400,
  };
};

Cities.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
