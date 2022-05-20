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
} from "@chakra-ui/react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import { faqs } from "./FaqInputs";

export default function HomeFAQ() {
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
            <chakra.p
              mt={2}
              fontSize={{ base: "3xl", sm: "4xl" }}
              lineHeight="8"
              fontWeight="extrabold"
              letterSpacing="tight"
              color={useColorModeValue("gray.900")}
            >
              Ask us Anything
            </chakra.p>
            <chakra.p
              mt={4}
              maxW="7xl"
              fontSize="xl"
              mx={{ lg: "auto" }}
              color={useColorModeValue("gray.500", "gray.400")}
            >
              Whether its through social media, email or discord, we are always
              happy to answer any questions you might have
            </chakra.p>
          </Box>

          <Box mt={10}>
            <Accordion allowToggle w="100%">
              {faqs.map((faq) => (
                <AccordionItem>
                  <AccordionButton>
                    <Box
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
                    </Box>
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
