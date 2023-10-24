/* eslint-disable react/prop-types */
import { Flex, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import { useContext } from "react";
import { LuTrash2 } from "react-icons/lu";

// import TimeTile from "components/dataDisplay/TimeTile";
import { CartContext } from "contexts/CartContext";

export default function CartRow(props) {
  const { removeFromCart } = useContext(CartContext);
  const { item, ...rest } = props;
  const { startDate, startTime, title, price } = item;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  // const iconBoxBg = useColorModeValue("secondaryGray.300", "navy.700");
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      w="100%"
      mb="20px"
      {...rest}
    >
      {/* <TimeTile
        date={new Date(startDate)}
        time={startTime}
        color="white"
        // bg={selected ? "gray.800" : "purple.400"}
        tileSize="sm"
        mr="20px"
      /> */}
      <Flex direction="column" align="start" me="auto">
        <Text color={textColor} fontSize="md" me="6px" fontWeight="700">
          {title}
        </Text>
        {startDate && (
          <Text color="secondaryGray.800" fontSize="sm" fontWeight="500">
            {new Date(startDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
            {" @ "}
            {startTime?.split(":")[0]}:{startTime?.split(":")[1]}
          </Text>
        )}
      </Flex>
      <Text
        ms="50px"
        color={useColorModeValue("green.400", "green.200")}
        fontSize="lg"
        me="6px"
        fontWeight="700"
      >
        € {price / 100}
      </Text>
      <IconButton
        // variant="outline"
        ml={3}
        color="brand.100"
        size="sm"
        icon={<LuTrash2 />}
        onClick={() => removeFromCart(item)}
      />
    </Flex>
  );
}
