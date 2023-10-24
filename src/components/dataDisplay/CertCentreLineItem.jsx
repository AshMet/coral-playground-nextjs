/* eslint-disable no-unsafe-optional-chaining */
// Not currently used

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// Chakra imports
import {
  Flex,
  Icon,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
// Custom components
import { useContext, useMemo, useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoMdTime } from "react-icons/io";

import { CartContext } from "contexts/CartContext";
import { combineDateAndTime } from "utils/helpers/diveCentresHelper";

export default function CertCentreLineItem(props) {
  const { certCentre, tripRules, type, icon, ...rest } = props;
  const { id, certName, price, stripePriceId, startTime, centreName } =
    certCentre;
  const { addToCart, cartItems } = useContext(CartContext);

  const priceColor = useColorModeValue("green.500", "green.200");
  // const bgHover = useColorModeValue("brand.100", "brand.100");
  // const bgFocus = useColorModeValue("brand.200", "brand.200");

  const [selectedDate, onChange] = useState();
  const { isOpen } = useDisclosure();

  const selectedBgColor = useColorModeValue("brand.400", "brand.400");
  const isInCart = cartItems?.map((a) => a.id).includes(id);

  const setDate = useMemo(() => {
    return (newDate) => {
      // setStartDate(newDate[0]);
      // setEndDate(newDate[1]);
      onChange(newDate);
      addToCart({
        id,
        title: certName,
        itemType: "diveTrip",
        centreName,
        startDate: combineDateAndTime(newDate, startTime),
        startTime,
        price,
        priceId: stripePriceId,
        deposit: price * 0.15,
      });
    };
  }, []);
  // console.log("selectedDate", selectedDate);
  // console.log("selectedDate", selectedDate);
  // console.log("certLinetem", centreCert);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      w="100%"
      borderRadius={10}
      bgColor={isInCart ? selectedBgColor : ""}
      my={isInCart ? "-20px" : ""}
      py={isInCart ? "20px" : ""}
      px={isInCart ? "10px" : ""}
      _hover={{
        boxShadow: "0.1em 0.1em 3em rgba(0,0,0,0.3)",
        zIndex: 10,
        transform: "scale(1.05)",
        my: isInCart ? "" : "-20px",
        py: isInCart ? "" : "20px",
        px: isInCart ? "" : "10px",
      }}
      {...rest}
    >
      <Flex direction="column" align="start" me="auto" w="100%" ml="10px">
        <Flex direction="row" align="stretch" me="auto">
          <Flex align="center">
            <Icon me="8px" as={HiOutlineLocationMarker} w="16px" h="16px" />
            <Text
              color={isInCart && "white"}
              fontSize="md"
              me="6px"
              fontWeight="700"
            >
              {centreName}
            </Text>
          </Flex>
        </Flex>

        <Flex align="center">
          <Icon me="8px" as={IoMdTime} w="16px" h="16px" />
          <Flex align="center">
            <DatePicker
              onChange={setDate}
              value={selectedDate}
              format="dd MMM y"
              minDate={new Date()}
              clearIcon={null}
              calendarIcon={null}
              // tileClassName={({ date, view }) =>
              //   getTileColor({ date, view }, tripRules)
              // }
              // tileDisabled={({ date }) => getDisabledTiles({ date }, tripRules)}
              isOpen={isOpen}
            />
          </Flex>
          <Text
            ml="5px"
            color={isInCart && "white"}
            fontSize="md"
            me="6px"
            fontWeight="500"
          >
            {startTime &&
              `@ ${startTime.split(":")[0]}:${startTime.split(":")[1]}`}
          </Text>
        </Flex>
      </Flex>
      <Spacer />
      <Flex direction="column">
        <Text
          fontSize="2xl"
          fontWeight="900"
          mt="0px"
          color={isInCart ? "green.200" : priceColor}
        >
          {certCentre?.price === 0 ? "FREE" : `€${certCentre?.price / 100}`}
        </Text>
      </Flex>
    </Flex>
  );
}
