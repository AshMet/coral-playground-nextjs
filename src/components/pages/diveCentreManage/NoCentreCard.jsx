import {
  Flex,
  Text,
  Button,
  Center,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdAdd } from "react-icons/md";

export default function NoCentreCard() {
  const textColor = useColorModeValue("gray.700", "white");
  const bgAdd = useColorModeValue("white", "navy.800");
  const router = useRouter();
  return (
    <Center>
      <Flex direction="column">
        <Text mb="10px">
          {" "}
          You have not set up your dive centre yet. Get Started Below:{" "}
        </Text>
        <Button
          bg="transparent"
          variant="no-hover"
          fontWeight="700"
          display="flex"
          h="max-content"
          w="max-content"
          mx="auto"
          my="30px"
          minW="max-content"
          boxShadow="unset"
          flexDirection="column"
          onClick={() => router.push("/diving/dive_centres/new")}
        >
          <Flex
            mx="auto"
            h="max-content"
            w="max-content"
            p="3px"
            borderRadius="50%"
            bg="linear-gradient(179.78deg, #7A64FF 0.23%, #FF508B 66.58%, #FD6D53 99.75%, #FD6D53 99.75%);
              
              "
          >
            <Flex
              borderRadius="50px"
              align="center"
              justify="center"
              bg={bgAdd}
              w="54px"
              h="54px"
            >
              <Icon as={MdAdd} color={textColor} w="24px" h="24px" />
            </Flex>
          </Flex>
          <Text
            mt="10px"
            textAlign="center"
            color={textColor}
            fontSize="sm"
            fontWeight="500"
          >
            Create Dive Centre
          </Text>
        </Button>
      </Flex>
    </Center>
  );
}
