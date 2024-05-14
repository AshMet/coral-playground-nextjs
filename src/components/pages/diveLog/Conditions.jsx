/* eslint-disable react/prop-types */
import {
  Text,
  SimpleGrid,
  useColorModeValue,
  Flex,
  Box,
  Icon,
} from "@chakra-ui/react";
import { MdOutlineWbSunny } from "react-icons/md";
import { PiWaves } from "react-icons/pi";
import { TbScubaMask } from "react-icons/tb";

import Card from "components/card/Card";
import CircularProgress from "components/charts/CircularProgress";

export default function Conditions({
  avgDepth,
  maxDepth,
  visibility,
  current,
}) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue(
    "secondaryGray.900",
    "secondaryGray.400"
  );
  const brandColor = useColorModeValue("brand.500", "white");
  const cardBg = useColorModeValue(
    "linear-gradient(180deg, #F4F7FE 0%, rgba(244, 247, 254, 0) 86.56%)",
    "linear-gradient(180deg, #1B254B 0%, rgba(27, 37, 75, 0) 86.56%)"
  );
  return (
    <Card p={{ base: "10px", md: "20px" }}>
      <Text fontSize="lg" lineHeight="100%" fontWeight="bold">
        Conditions
      </Text>
      <Flex direction="column" p="16px" borderRadius="22px" bg={cardBg} mt={6}>
        <Flex w="100%" justify="space-between">
          <Box>
            <Icon
              as={MdOutlineWbSunny}
              color={brandColor}
              h="58px"
              w="58px"
              mb="15px"
            />
            <Text
              color={textColor}
              fontSize={{ sm: "32px", md: "42px" }}
              lineHeight="110%"
              fontWeight="bold"
            >
              25°C
            </Text>
            <Text color={textColorSecondary} fontSize="md" fontWeight="500">
              Sunny
            </Text>
          </Box>
          <Box>
            <Icon as={PiWaves} color={brandColor} h="58px" w="58px" mb="15px" />
            <Text
              color={textColor}
              fontSize={{ sm: "32px", md: "42px" }}
              lineHeight="110%"
              fontWeight="bold"
            >
              20°C
            </Text>
            <Text color={textColorSecondary} fontSize="md" fontWeight="500">
              Surface
            </Text>
          </Box>
          <Box>
            <Icon
              as={TbScubaMask}
              color={brandColor}
              h="58px"
              w="58px"
              mb="15px"
            />
            <Text
              color={textColor}
              fontSize={{ sm: "32px", md: "42px" }}
              lineHeight="110%"
              fontWeight="bold"
            >
              18°C
            </Text>
            <Text color={textColorSecondary} fontSize="md" fontWeight="500">
              Bottom
            </Text>
          </Box>
        </Flex>
      </Flex>
      <SimpleGrid mt="20px" columns={{ sm: 2, md: 3 }} gap="20px" mb="20px">
        {maxDepth && (
          <CircularProgress
            title="Depth"
            value={maxDepth}
            text={`${avgDepth || "N/A"} - ${maxDepth || "N/A"}m`}
          />
        )}
        {visibility && (
          <CircularProgress
            title="Visibility"
            value={visibility}
            text={`${visibility || "N/A"}m`}
          />
        )}
        {current && (
          <CircularProgress
            title="Current"
            value={current}
            text={`${current || "N/A"}`}
          />
        )}
      </SimpleGrid>
    </Card>
  );
}
