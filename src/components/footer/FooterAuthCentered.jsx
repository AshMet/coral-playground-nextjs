// import React from "react";
import {
  Flex,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Footer() {
  const textColor = useColorModeValue("gray.400", "white");
  return (
    <Flex
      w={{ base: "100%", xl: "1170px" }}
      maxW={{ base: "90%", xl: "1170px" }}
      zIndex="1.5"
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-between"
      px={{ base: "0px", xl: "0px" }}
      pb="30px"
      mx="auto"
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
        <Text as="span" fontWeight="500" ms="4px">
          <Link
            mx="3px"
            color={textColor}
            href="/"
            target="_blank"
            fontWeight="700"
          >
            Coral Playground
          </Link>{" "}
          All Rights Reserved
        </Text>
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
          <Link fontWeight="500" color={textColor} href="/">
            How It Works
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link fontWeight="500" color={textColor} href="/">
            Timeline
          </Link>
        </ListItem>
        <ListItem>
          <Link fontWeight="500" color={textColor} href="/">
            Mission
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
