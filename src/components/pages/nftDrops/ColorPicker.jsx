/* eslint-disable react/prop-types */
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
// Assets
import { IoMdTrendingUp } from "react-icons/io";

export default function ColorPicker(props) {
  // Chakra Color Mode
  const { name, bid } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const shadow = useColorModeValue(
    " 0px 50px 40px -34px rgba(112, 144, 176, 0.16)",
    "unset"
  );
  const borderColor = useColorModeValue("secondaryGray.400", "transparent");
  const cardBg = useColorModeValue("white", "navy.800");
  // const [bodyBase, setBodyBase] = useState("#ffffff"); // default: #71c6c1
  // const [bodyShading, setBodyShading] = useState("#ffffff");
  // const [tentacles, setTentacles] = useState("#ffffff");
  // const [tentacleShading, setTentacleShading] = useState("#ffffff");
  // const [eyeColor, setEyeColor] = useState("#ffffff");
  // const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [bodyBaseColorPicker, setBodyBaseColorPicker] = useState(false);
  const [bodyShadingColorPicker, setBodyShadingColorPicker] = useState(false);
  const [tentaclesColorPicker, setTentaclesColorPicker] = useState(false);
  const [tentacleShadingColorPicker, setTentacleShadingColorPicker] =
    useState(false);
  const [eyeColorPicker, setEyeColorPicker] = useState(false);
  const [backgroundColorPicker, setBackgroundColorPicker] = useState(false);
  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };
  return (
    <Flex
      direction="column"
      ps={{ base: "unset", lg: "'65px'" }}
      mx="auto"
      maxW={{ base: "100%", md: "max-content" }}
    >
      <Text
        color={textColor}
        fontSize={{ base: "36px", "2xl": "54px" }}
        fontWeight="700"
        mb="-30px"
        lineHeight="100%"
      >
        {name}
      </Text>
      {/* Start Color Picker */}
      <SimpleGrid gap={{ sm: "12px" }} columns={2} mt="65px" mb="40px">
        <Flex direction="column">
          <Flex alignItems="center">
            <Box
              h={{ base: "40px", md: "60px" }}
              w={{ base: "40px", md: "60px" }}
              bg="green.500"
              me="20px"
              borderRadius="50px"
              justify="center"
              align="center"
              // bg={bodyBase}
              onClick={() => setBodyBaseColorPicker(true)}
            />
            {bodyBaseColorPicker ? (
              <Box style={popover}>
                <Box
                  style={cover}
                  onClick={() => setBodyBaseColorPicker(false)}
                />
                {/* <SwatchesPicker
                color={bodyBase}
                onChangeComplete={(color) => {
                  setBodyBase(color.hex);
                  onChangeColor();
                }}
              /> */}
              </Box>
            ) : null}
            <Box>
              <Text color="secondaryGray.600" fontSize="md" fontWeight="500">
                Body Color
              </Text>
              <Flex align="center">
                <Text color={textColor} fontSize="lg" fontWeight="700" me="5px">
                  #FFFFFF
                  {/* {bodyBase} */}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Flex alignItems="center">
            <Box
              h={{ base: "40px", md: "60px" }}
              w={{ base: "40px", md: "60px" }}
              bg="green.500"
              me="20px"
              borderRadius="50px"
              justify="center"
              align="center"
              // bg={bodyShading}
              onClick={() => setBodyShadingColorPicker(true)}
            />
            {bodyShadingColorPicker ? (
              <Box style={popover}>
                <Box
                  style={cover}
                  onClick={() => setBodyShadingColorPicker(false)}
                />
                {/* <SwatchesPicker
                color={bodyShading}
                onChangeComplete={(color) => {
                  setBodyShading(color.hex);
                  onChangeColor();
                }}
              /> */}
              </Box>
            ) : null}
            <Box>
              <Text color="secondaryGray.600" fontSize="md" fontWeight="500">
                Body Shading
              </Text>
              <Flex align="center">
                <Text color={textColor} fontSize="lg" fontWeight="700" me="5px">
                  #FFFFFF
                  {/* {bodyShading} */}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Flex alignItems="center">
            <Box
              h={{ base: "40px", md: "60px" }}
              w={{ base: "40px", md: "60px" }}
              bg="green.500"
              me="20px"
              borderRadius="50px"
              justify="center"
              align="center"
              // bg={tentacles}
              onClick={() => setTentaclesColorPicker(true)}
            />
            {tentaclesColorPicker ? (
              <Box style={popover}>
                <Box
                  style={cover}
                  onClick={() => setTentaclesColorPicker(false)}
                />
                {/* <SwatchesPicker
                align="center"
                color={tentacles}
                onChangeComplete={(color) => {
                  setTentacles(color.hex);
                  onChangeColor();
                }}
              /> */}
              </Box>
            ) : null}
            <Box>
              <Text color="secondaryGray.600" fontSize="md" fontWeight="500">
                Tentacles
              </Text>
              <Flex align="center">
                <Text color={textColor} fontSize="lg" fontWeight="700" me="5px">
                  #FFFFFF
                  {/* {tentacles} */}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Flex alignItems="center">
            <Box
              h={{ base: "40px", md: "60px" }}
              w={{ base: "40px", md: "60px" }}
              bg="green.500"
              me="20px"
              borderRadius="50px"
              justify="center"
              align="center"
              // bg={tentacleShading}
              onClick={() => setTentacleShadingColorPicker(true)}
            />
            {tentacleShadingColorPicker ? (
              <Box style={popover}>
                <Box
                  style={cover}
                  onClick={() => setTentacleShadingColorPicker(false)}
                />
                {/* <SwatchesPicker
                color={tentacleShading}
                onChangeComplete={(color) => {
                  setTentacleShading(color.hex);
                  onChangeColor();
                }}
              /> */}
              </Box>
            ) : null}
            <Box>
              <Text color="secondaryGray.600" fontSize="md" fontWeight="500">
                Tentacle Shading
              </Text>
              <Flex align="center">
                <Text color={textColor} fontSize="lg" fontWeight="700" me="5px">
                  #FFFFFF
                  {/* {tentacleShading} */}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Flex alignItems="center">
            <Box
              h={{ base: "40px", md: "60px" }}
              w={{ base: "40px", md: "60px" }}
              bg="green.500"
              me="20px"
              borderRadius="50px"
              justify="center"
              align="center"
              // bg={eyeColor}
              onClick={() => setEyeColorPicker(true)}
            />
            {eyeColorPicker ? (
              <Box style={popover}>
                <Box style={cover} onClick={() => setEyeColorPicker(false)} />
                {/* <SwatchesPicker
                color={eyeColor}
                onChangeComplete={(color) => {
                  setEyeColor(color.hex);
                  onChangeColor();
                }}
              /> */}
              </Box>
            ) : null}
            <Box>
              <Text color="secondaryGray.600" fontSize="md" fontWeight="500">
                Eye Color
              </Text>
              <Flex align="center">
                <Text color={textColor} fontSize="lg" fontWeight="700" me="5px">
                  #FFFFFF
                  {/* {eyeColor} */}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Flex alignItems="center">
            <Box
              h={{ base: "40px", md: "60px" }}
              w={{ base: "40px", md: "60px" }}
              bg="green.500"
              me="20px"
              borderRadius="50px"
              justify="center"
              align="center"
              // bg={backgroundColor}
              onClick={() => setBackgroundColorPicker(true)}
            />
            {backgroundColorPicker ? (
              <Box style={popover}>
                <Box
                  style={cover}
                  onClick={() => setBackgroundColorPicker(false)}
                />
                {/* <SwatchesPicker
                color={backgroundColor}
                onChangeComplete={(color) => {
                  setBackgroundColor(color.hex);
                  onChangeColor();
                }}
              /> */}
              </Box>
            ) : null}
            <Box>
              <Text color="secondaryGray.600" fontSize="md" fontWeight="500">
                Background Color
              </Text>
              <Flex align="center">
                <Text color={textColor} fontSize="lg" fontWeight="700" me="5px">
                  #FFFFFF
                  {/* {backgroundColor} */}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </SimpleGrid>
      <Flex
        w="100%"
        align="center"
        p="60px"
        direction="column"
        border="1px solid"
        borderColor={borderColor}
        boxShadow={shadow}
        bg={cardBg}
        borderRadius="30px"
        mb="50px"
      >
        <Text fontWeight="500" color={textColor} fontSize="22px">
          Mint Price
        </Text>
        <Text
          fontWeight="700"
          color={textColor}
          fontSize={{ base: "48px", md: "54px", xl: "64px" }}
          my="10px"
          lineHeight="100%"
        >
          {bid} ETH
        </Text>
        <Flex mb={{ base: "0px", md: "30px" }}>
          <Text
            fontWeight="700"
            color="secondaryGray.600"
            fontSize="24px"
            mb="50px"
          >
            $10.927,84
          </Text>
          <Icon
            ms="6px"
            mt="4px"
            as={IoMdTrendingUp}
            h="24px"
            w="24px"
            color="green.500"
          />
        </Flex>

        <Text fontSize="xl" color={textColor} fontWeight="500" mb="28px">
          Minting begins in
        </Text>
        <Flex w="100%" justify="center">
          <Flex direction="column" align="center" me="60px">
            <Text
              color={textColor}
              fontSize={{ base: "34px", md: "44px" }}
              fontWeight="700"
            >
              20
            </Text>
            <Text color="secondaryGray.600" fontSize="24px" fontWeight="500">
              Hrs
            </Text>
          </Flex>
          <Flex direction="column" align="center" me="60px">
            <Text
              color={textColor}
              fontSize={{ base: "34px", md: "44px" }}
              fontWeight="700"
            >
              37
            </Text>
            <Text color="secondaryGray.600" fontSize="24px" fontWeight="500">
              Mins
            </Text>
          </Flex>
          <Flex direction="column" align="center">
            <Text
              color={textColor}
              fontSize={{ base: "34px", md: "44px" }}
              fontWeight="700"
            >
              49
            </Text>
            <Text color="secondaryGray.600" fontSize="24px" fontWeight="500">
              Secs
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Button variant="brand" fontSize="sm" fontWeight="500" h="46px">
        Place a bid
      </Button>
    </Flex>
  );
}
