/* eslint-disable react/prop-types */
const { HStack, Tag } = require("@chakra-ui/react");

export default function BlogTags(props) {
  const { marginTop, tags } = props;
  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <Tag
            size="md"
            variant="solid"
            bgColor="brand.400"
            color="white"
            key={tag}
          >
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
}
