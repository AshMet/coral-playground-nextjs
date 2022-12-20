/* eslint-disable react/prop-types */
import { Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";

import IconBox from "components/icons/IconBox";

export default function IconStep(props) {
  const { icon, title, subtitle, ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const shadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const completeShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "inset 0px 4px 4px rgba(255, 255, 255, 0.2)"
  );
  const boxBg = useColorModeValue(
    "white",
    "linear-gradient(180deg, #1F2A4F 0%, #18224D 50.63%, #111C44 100%)"
  );

  return (
    <Flex direction="column" align="center" justify="center" {...rest}>
      <IconBox
        mb="16px"
        w="100px"
        h="100px"
        bg={boxBg}
        shadow={shadow}
        boxShadow={completeShadow}
        icon={<Icon w="38px" h="38px" as={icon} color={brandColor} />}
      />
      <Text
        textAlign="center"
        color={textColor}
        fontSize="xl"
        fontWeight="700"
        mb="10px"
      >
        {title}
      </Text>
      <Text
        textAlign="center"
        color="secondaryGray.600"
        fontSize="md"
        fontWeight="400"
        maxW="278px"
        mb="70px"
      >
        {subtitle}
      </Text>
    </Flex>
  );
}
