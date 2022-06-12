/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable react/prop-types */
import { Badge, Icon, Flex, Button, Text } from "@chakra-ui/react";
// Custom components
import { MdShare, MdEdit, MdDownload } from "react-icons/md";

import Card from "components/card/Card";
import { VSeparator } from "components/separator/Separator";

// Assets
// import InvoiceBg from "assets/img/account/InvoiceBg.png";

export default function Banner(props) {
  const {
    sessionId,
    status,
    illustration,
    focused,
    title,
    value,
    detail,
    ...rest
  } = props;

  // Chakra Color Mode
  const bgButton = "rgba(255,255,255,0.12)";
  const bgHover = { bg: "whiteAlpha.50" };
  const bgFocus = { bg: "rgba(255,255,255,0.12)" };

  return (
    <Card
      backgroundImage="/img/nfts/NftBanner1.jpg"
      backgroundRepeat="no-repeat"
      bgSize="cover"
      bgPosition="10%"
      p={{ base: "20px", md: "60px" }}
      pt={{ base: "40px", md: "75px" }}
      pb="140px"
    >
      <Flex>
        <Badge
          w="max-content"
          mb="10px"
          fontSize="sm"
          bg="green.400"
          color="white"
          fontWeight="bold"
        >
          {status}
        </Badge>
        <Button
          ms="auto"
          me="10px"
          align="center"
          justifyContent="center"
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          p="7px"
          minW="unset"
          h="32px"
          lineHeight="100%"
          borderRadius="10px"
          {...rest}
        >
          <Icon as={MdEdit} color="white" w="18px" h="18px" />
        </Button>
        <Button
          align="center"
          me="10px"
          justifyContent="center"
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          p="7px"
          minW="unset"
          h="32px"
          lineHeight="100%"
          borderRadius="10px"
          {...rest}
        >
          <Icon as={MdDownload} color="white" w="18px" h="18px" />
        </Button>
        <Button
          align="center"
          justifyContent="center"
          bg="linear-gradient(293.45deg, #FA709A 0%, #FEE140 92.27%)"
          _hover={{
            bg: "linear-gradient(293.45deg, #FA709A 0%, #FEE140 92.27%)",
          }}
          _focus={{
            bg: "linear-gradient(293.45deg, #FA709A 0%, #FEE140 92.27%)",
          }}
          _active={{
            bg: "linear-gradient(293.45deg, #FA709A 0%, #FEE140 92.27%)",
          }}
          p="7px"
          minW="unset"
          h="32px"
          lineHeight="100%"
          borderRadius="10px"
          {...rest}
        >
          <Icon as={MdShare} color="white" w="18px" h="18px" />
        </Button>
      </Flex>
      <Flex
        mb={{ base: "0px", md: "50px" }}
        direction={{ base: "column", md: "row" }}
      >
        <Flex
          direction="column"
          color="white"
          h="100%"
          w="100%"
          mb={{ base: "20px", md: "0px" }}
        >
          <Text
            mt={{ base: "10px", md: "0px" }}
            fontSize={{ base: "2xl", md: "32px", lg: "44px", xl: "44px" }}
            fontWeight="bold"
          >
            Invoice #03941
          </Text>
          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="regular">
            {`${sessionId.substring(0, 30)}...`}
          </Text>
        </Flex>
        <VSeparator
          bg="whiteAlpha.300"
          mx={{ base: "10px", md: "40px" }}
          display={{ base: "none", md: "flex" }}
        />
        <Flex direction="column" color="white" h="100%" w="100%">
          <Text
            fontSize={{ base: "md", md: "xl" }}
            mt={{ base: "10px", md: "0px" }}
            fontWeight="regular"
          >
            2845 Sherry Street
          </Text>
          <Text fontSize={{ base: "md", md: "xl" }} fontWeight="regular">
            Hurghada, Egypt
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
