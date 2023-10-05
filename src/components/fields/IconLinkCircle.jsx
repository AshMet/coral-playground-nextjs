/* eslint-disable react/prop-types */
import {
  Flex,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function IconLinkCircle(props) {
  const { title, icon, url, iconColor, onClick, ...rest } = props;
  const router = useRouter();
  const textColor = useColorModeValue("gray.700", "white");
  const defaultIconColor = useColorModeValue("brand.500", "white");
  const bgIconButton = useColorModeValue("white", "whiteAlpha.100");
  const bgIconHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgIconFocus = useColorModeValue(
    { bg: "white" },
    { bg: "whiteAlpha.100" }
  );
  const shadow = useColorModeValue(
    "18px 17px 40px 4px rgba(112, 144, 176, 0.1)",
    "unset"
  );
  return (
    <Flex
      direction="column"
      align="center"
      me={{ base: "16px", md: "0px", "2xl": "36px" }}
    >
      <IconButton
        borderRadius="50%"
        bg={bgIconButton}
        _hover={bgIconHover}
        _active={bgIconFocus}
        _focus={bgIconFocus}
        w="56px"
        h="56px"
        mb="5px"
        boxShadow={shadow}
        onClick={onClick || (() => router.push(url))}
        icon={
          <Icon
            as={icon}
            color={iconColor || defaultIconColor}
            w="24px"
            h="24px"
          />
        }
        {...rest}
      />
      <Text fontSize="sm" fontWeight="500" color={textColor}>
        {title}
      </Text>
    </Flex>
  );
}
