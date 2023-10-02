/* eslint-disable react/prop-types */
import { Flex, Button, Text, useColorModeValue } from "@chakra-ui/react";

export default function SidebarInvoice(props) {
  const { title, sum, icon, subtitle, action, actionName, ...rest } = props;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Flex justifyContent="center" alignItems="center" w="100%" {...rest}>
      <Flex direction="column" align="start" me="auto">
        <Text color={textColor} fontSize="md" me="6px" fontWeight="700">
          {title}
        </Text>
        <Text color="secondaryGray.600" fontSize="sm" fontWeight="500">
          {subtitle}
        </Text>
      </Flex>
      <Text
        ms="auto"
        color={textColor}
        fontSize="sm"
        me="14px"
        fontWeight="700"
      >
        {sum}
      </Text>
      {actionName && (
        <Button
          variant="action"
          px="24px"
          onClick={action}
          fontSize="sm"
          fontWeight="700"
        >
          {actionName}
        </Button>
      )}
    </Flex>
  );
}
