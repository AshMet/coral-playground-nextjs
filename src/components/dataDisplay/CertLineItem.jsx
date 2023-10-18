// Not currently used

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Spacer,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
// Custom components
import { useContext, useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoMdTime } from "react-icons/io";
import { MdAddCircle } from "react-icons/md";

import { CartContext } from "contexts/CartContext";
import {
  combineDateAndTime,
  // getTileColor,
  // getDisabledTiles,
} from "utils/helpers/diveCentresHelper";

import TimeTile from "./TimeTile";

export default function TripLineItem(props) {
  const { centreCert, tripRules, icon, ...rest } = props;
  const { id, certName, price, stripePriceId, startTime, centreName } =
    centreCert || {};
  const { addToCart } = useContext(CartContext);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  // const bgHover = useColorModeValue("brand.100", "brand.100");
  // const bgFocus = useColorModeValue("brand.200", "brand.200");

  const [selectedDate, onChange] = useState();
  const { isOpen, onToggle } = useDisclosure();

  // console.log("selectedDate", selectedDate);
  // console.log("selectedDate", selectedDate);
  // console.log("certLinetem", centreCert);

  return (
    <Flex justifyContent="center" alignItems="center" w="100%" {...rest}>
      <Box onClick={onToggle}>
        <TimeTile
          date={new Date(selectedDate)}
          time={startTime}
          color="white"
          bg="brand.400"
        />
      </Box>
      <Spacer />
      <Flex direction="column" align="start" me="auto" w="100%" ml="10px">
        <Flex direction="row" align="stretch" me="auto">
          <Flex align="center">
            <Icon me="8px" as={HiOutlineLocationMarker} w="16px" h="16px" />
            <Text color={textColor} fontSize="md" me="6px" fontWeight="700">
              {certName}
            </Text>
          </Flex>
        </Flex>

        <Flex align="center">
          <Icon me="8px" as={IoMdTime} w="16px" h="16px" />
          <Flex align="center">
            <DatePicker
              onChange={onChange}
              value={selectedDate}
              // format="dd MMM y"
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
            color={textColor}
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
          ms="auto"
          color="green.500"
          fontSize="sm"
          me="6px"
          fontWeight="700"
        >
          €
          <Text as="span" fontSize="lg">
            {price / 100}
          </Text>
        </Text>
        <Tooltip label="Add to Cart">
          <Button
            align="center"
            justifyContent="center"
            // bg="brand.100"
            colorScheme="brand"
            w="37px"
            h="37px"
            mt="10px"
            lineHeight="100%"
            borderRadius="10px"
            onClick={() =>
              addToCart({
                id,
                title: certName,
                itemType: "certification",
                centreName,
                startDate: combineDateAndTime(selectedDate, startTime),
                diveTime: startTime,
                price,
                priceId: stripePriceId,
                deposit: price * 0.15,
              })
            }
            {...rest}
          >
            <Icon as={MdAddCircle} color="white" w="24px" h="24px" />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
