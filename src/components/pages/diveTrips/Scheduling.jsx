/* eslint-disable react/prop-types */
import {
  Text,
  Icon,
  useColorModeValue,
  Flex,
  FormLabel,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import Calendar from "react-calendar";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import TimePicker from "react-time-picker/dist/entry.nostyle";
// Chakra imports

// Custom components
import Card from "components/card/Card";

export default function MiniCalendar(props) {
  const {
    selectRange,
    diveDate,
    setDiveDate,
    setDiveTime,
    diveTime,
    diveCount,
    setDiveCount,
    ...rest
  } = props;
  // const [diveDate, setDiveDate] = useState(new Date());
  // const [diveTime] = useState();
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("transparent", "whiteAlpha.100");

  // useEffect(() => {
  //   setSelectedDate(diveDate);
  // }, [setSelectedDate, diveDate]);

  return (
    <Flex direction="column" my={5}>
      <Card
        border="1px solid"
        borderColor={borderColor}
        align="center"
        direction="column"
        w="100%"
        minW="400px"
        // p="20px 15px"
        h="max-content"
        {...rest}
      >
        <Flex direction="column">
          <FormLabel
            ms="10px"
            htmlFor="diveDate"
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            _hover={{ cursor: "pointer" }}
          >
            Dive Date
          </FormLabel>
          <Calendar
            onChange={setDiveDate}
            value={diveDate}
            selectRange={selectRange}
            view="month"
            tileContent={<Text color="brand.500" />}
            prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
            nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
          />
          <FormLabel
            ms="10px"
            htmlFor="diveStartTime"
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            _hover={{ cursor: "pointer" }}
            mb={0}
          >
            Dive Departure Time
          </FormLabel>
          <TimePicker onChange={setDiveTime} value={diveTime} disableClock />
          {/* <FormLabel
          mt="30px"
          ms="10px"
          htmlFor="diveTime"
          fontSize="sm"
          color={textColor}
          fontWeight="bold"
          _hover={{ cursor: "pointer" }}
        >
          Dive Time
        </FormLabel>
        <Select
          value={diveTime}
          fontSize="sm"
          id="diveTime"
          variant="main"
          h="44px"
          maxh="44px"
          placeholder="Please select"
          onChange={(e) => setDiveTime(e.target.value)}
        >
          <option value="morning">Morning (9:00 AM)</option>
          <option value="afternoon">Afternoon (1:00 PM)</option>
        </Select> */}
        </Flex>
        <FormLabel
          ms="10px"
          htmlFor="numberDives"
          fontSize="sm"
          color={textColor}
          fontWeight="bold"
          _hover={{ cursor: "pointer" }}
          mt={5}
        >
          Number of Dives
        </FormLabel>
        <NumberInput
          fontSize="sm"
          id="minCert"
          variant="main"
          h="40px"
          maxh="44px"
          placeholder="Select..."
          borderColor={borderColor}
        >
          <NumberInputField
            color={textColor}
            value={diveCount}
            min={1}
            max={10}
            defaultValue={1}
            onChange={(e) => setDiveCount(Number(e.target.value))}
          />
          {/* <NumberInputStepper>
            <NumberIncrementStepper onClick={(e) => setDiveCount(e.target.value)} />
            <NumberDecrementStepper />
          </NumberInputStepper> */}
        </NumberInput>
      </Card>
    </Flex>
  );
}
