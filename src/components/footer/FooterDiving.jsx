// import React from "react";
import {
  Flex,
  List,
  ListItem,
  Text,
  // Button,
  // useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Footer() {
  const textColor = useColorModeValue("gray.400", "white");
  // const { toggleColorMode } = useColorMode();
  return (
    <Flex
      zIndex="3"
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-between"
      px={{ base: "30px", md: "50px" }}
      pb="30px"
    >
      <Text
        color={textColor}
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}
      >
        {" "}
        &copy; {1900 + new Date().getYear()}
        <Text as="span" fontWeight="700" ms="4px">
          Coral Playground.
        </Text>{" "}
        All Rights Reserved
      </Text>
      <List display="flex">
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link fontWeight="500" color={textColor} href="/">
            About Us
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link fontWeight="500" color={textColor} href="/blog">
            Blog
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link fontWeight="500" color={textColor} href="/faq/divers">
            FAQs
          </Link>
        </ListItem>
        <ListItem>
          <Link fontWeight="500" color={textColor} href="/business/home">
            Become a Partner
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
