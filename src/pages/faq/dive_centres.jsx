import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Text,
  List,
  ListIcon,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import LandingLayout from "../../layouts/home/Landing";
import faqs from "lib/constants/diveCentreFaqInputs.json";

export default function DiveCentreFAQ() {
  const router = useRouter();

  return (
    <Flex
      // bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={{ sm: "5", md: "10", lg: "20" }}
      w="auto"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        py={12}
        // bg={useColorModeValue("white", "gray.800")}
        rounded="xl"
      >
        <Box maxW="7xl" mx="auto" px={{ base: 4, lg: 8 }}>
          <Box textAlign={{ lg: "center" }}>
            <chakra.h2
              color={useColorModeValue("brand.600")}
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              FAQs
            </chakra.h2>
            <Text
              mt={2}
              fontSize={{ base: "3xl", sm: "4xl" }}
              lineHeight="8"
              fontWeight="extrabold"
              letterSpacing="tight"
              color={useColorModeValue("gray.900")}
              mb={10}
            >
              Ask us Anything
            </Text>
            {/* Mini Navbar */}
            <Flex
              bg="#F6F8FD"
              borderRadius="70px"
              w="300px"
              minH={{ base: "140px", md: "80px" }}
              mx="auto"
              mb="70px"
              justify="space-between"
              p="10px"
              px={{ base: "30px", md: "10px" }}
              maxW="95%"
              flexWrap={{ base: "wrap", md: "nowrap" }}
            >
              {/* <NavLink to="/terms-of-service" color="brand.300"> */}
              <Button
                h="60px"
                justify="center"
                align="center"
                w="138px"
                borderRadius="30px"
                bg="transparent"
                _hover={{
                  bg: "white",
                }}
                _active={{
                  bg: "white",
                }}
                onClick={() => router.push("/faq/divers")}
              >
                <Text fontWeight="500" color="brand.300">
                  Divers
                </Text>
              </Button>
              {/* </NavLink> */}
              {/* <NavLink to="/privacy-policy" color="brand.300"> */}
              <Button
                h="60px"
                justify="center"
                align="center"
                w="130px"
                borderRadius="30px"
                bg="white"
                _hover={{
                  bg: "white",
                }}
                _active={{
                  bg: "white",
                }}
              >
                <Text fontWeight="500" color="brand.300">
                  Dive Centres
                </Text>
              </Button>
              {/* </NavLink> */}
            </Flex>
          </Box>

          <Box mt={10}>
            <Accordion allowToggle w="100%">
              {faqs.map((faq) => (
                <AccordionItem>
                  <AccordionButton>
                    <Flex
                      flex="1"
                      textAlign="left"
                      justifyItems="center"
                      py="2"
                      fontWeight="extrabold"
                      fontSize={{ base: "md", sm: "md", md: "xl" }}
                      direction="row"
                    >
                      <List>
                        <ListIcon
                          as={AiOutlineQuestionCircle}
                          color="white.300"
                          fontWeight="500"
                          mr="3"
                        />
                      </List>
                      <Text as="span">{faq.question}</Text>
                    </Flex>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>{faq.answer}</AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

DiveCentreFAQ.getLayout = function getLayout(page) {
  return <LandingLayout>{page}</LandingLayout>;
};
