/* eslint-disable react/prop-types */
import { Avatar, HStack, Text } from "@chakra-ui/react";

export default function BlogAuthor(props) {
  const { name, date } = props;
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Avatar
        borderRadius="full"
        boxSize="40px"
        bgColor="brand.yellow"
        // src="/mouth_guard/boxer-wearing-mouthguard.jpg"
        width={10}
        height={10}
        alt={`Avatar of ${name}`}
      />
      <Text fontWeight="medium">{name}</Text>
      <Text>—</Text>
      <Text>{date.toLocaleDateString()}</Text>
    </HStack>
  );
}
