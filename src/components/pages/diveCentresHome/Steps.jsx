/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
import {
  Container,
  Box,
  chakra,
  Text,
  SimpleGrid,
  Flex,
  // Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsCartCheck, BsShop } from "react-icons/bs";
import { TbScubaMask } from "react-icons/tb";

const features = [
  {
    heading: "Create Dive Centre",
    content:
      "Set up your dive center profile and become part of our network of trusted businesses.",
    icon: <BsShop size="40px" />,
  },
  {
    heading: "Add Dive Trips",
    content:
      "Offer your customers a range of diving experiences by listing your dive trips and packages.",
    icon: <TbScubaMask size="40px" />,
  },
  {
    heading: "Receive Bookings",
    content:
      "Start receiving bookings from customers all over the world. Our platform handles all the details.",
    icon: <BsCartCheck size="40px" />,
  },
];

const Features = () => {
  return (
    <Container maxW="6xl" p={{ base: 5, md: 10 }}>
      <SimpleGrid
        columns={{ sm: 1, md: 3 }}
        placeItems="center"
        spacing={10}
        mb={4}
      >
        {features.map((feature, index) => (
          <Box
            key={index}
            bg={useColorModeValue("gray.100", "gray.700")}
            p={6}
            rounded="lg"
            textAlign="center"
            pos="relative"
            mb={6}
          >
            <Flex
              p={4}
              w="max-content"
              color="white"
              bgGradient="linear(to-br, #228be6, #15aabf)"
              rounded="md"
              marginInline="auto"
              pos="absolute"
              left={0}
              right={0}
              top="-2rem"
              boxShadow="lg"
            >
              {feature.icon}
            </Flex>
            <chakra.h3 fontWeight="semibold" fontSize="2xl" mt={6}>
              {feature.heading}
            </chakra.h3>
            <Text fontSize="md" mt={4}>
              {feature.content}
            </Text>
            {/* <Link href="#" mt={4} fontSize="sm" color="blue.400">
              Learn more →
            </Link> */}
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Features;
