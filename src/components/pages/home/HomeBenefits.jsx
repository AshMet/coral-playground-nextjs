/* eslint-disable react/prop-types */
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Icon,
  Stack,
} from "@chakra-ui/react";
import {
  GiScubaMask,
  GiScubaTanks,
  GiShop,
  GiEarthAmerica,
} from "react-icons/gi";

const Feature = (props) => {
  const { icon, title, children } = props;
  return (
    <Flex>
      <Flex shrink={0}>
        <Flex
          alignItems="center"
          justifyContent="center"
          h={12}
          w={12}
          rounded="md"
          bg={useColorModeValue("brand.500")}
          color="white"
        >
          <Icon
            boxSize={6}
            color={useColorModeValue("white", "gray.300")}
            // fill="none"
            // viewBox="0 0 24 24"
            // stroke="currentColor"
            // aria-hidden="true"
            as={icon}
          />
        </Flex>
      </Flex>
      <Box ml={4}>
        <chakra.dt
          fontSize="lg"
          fontWeight="medium"
          lineHeight="6"
          color={useColorModeValue("gray.900")}
        >
          {title}
        </chakra.dt>
        <chakra.dd mt={2} color={useColorModeValue("gray.500", "gray.400")}>
          {children}
        </chakra.dd>
      </Box>
    </Flex>
  );
};

export default function HomeBenefits() {
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
              Benefits
            </chakra.h2>
            <chakra.p
              mt={2}
              fontSize={{ base: "3xl", sm: "4xl" }}
              lineHeight="8"
              fontWeight="extrabold"
              letterSpacing="tight"
              color={useColorModeValue("gray.900")}
            >
              Community-Driven All-in-One Platform
            </chakra.p>
            <chakra.p
              mt={4}
              maxW="2xl"
              fontSize="xl"
              mx={{ lg: "auto" }}
              color={useColorModeValue("gray.500", "gray.400")}
            >
              Coral Playground is an immersive Ocean Metaverse aimed at making a
              measurable & sustainable improvement in the health of our marine
              eco-systems by engaging all relevant parties on a single platform.
            </chakra.p>
          </Box>

          <Box mt={10}>
            <Stack
              spacing={{ base: 10, md: 0 }}
              display={{ md: "grid" }}
              gridTemplateColumns={{ md: "repeat(2,1fr)" }}
              gridColumnGap={{ md: 8 }}
              gridRowGap={{ md: 10 }}
            >
              <Feature title="Ocean entusiasts" icon={GiScubaMask}>
                {`Whether you're a diver, snorkeller or beach vacationer, we give
                you the ability to be more informed as you explore, enable you
                to book unique ocean experiences, purchase collectibles, and
                earn value for your contributions to the community.`}
              </Feature>

              <Feature title="Professionals" icon={GiScubaTanks}>
                We aim to empower people to be able to promote themselves and
                their accomplishments. By helping to make preservation more
                economically valuable than exploitation, we can shift mindsets
                and help individuals monetize their contributions.
              </Feature>

              <Feature title="Businesses" icon={GiShop}>
                Identifying exceptional businesses and outstanding contributions
                can be the foundation for commuity led efforts, and we want to
                help distinguish and reward those businesses. This ultimately
                provides a safer and more enjoyable exprience for all users.
              </Feature>

              <Feature title="Environmental Agencies" icon={GiEarthAmerica}>
                {`Whether it's with local beach clean-ups, marine research or
                larger scale preservation initiatives, our aim is to provide a
                sustainable source of funding with direct involvement from these
                agencies in idenitfying the biggest opportunities for positive
                impact.`}
              </Feature>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
