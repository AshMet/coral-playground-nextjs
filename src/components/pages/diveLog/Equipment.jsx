/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import {
  Flex,
  Icon,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaWeightHanging } from "react-icons/fa";
import { GiScubaTanks, GiSpaceSuit } from "react-icons/gi";

import Image from "components/actions/NextChakraImg";
import Card from "components/card/Card";

import LogLineItem from "./LogLineItem";

export default function EquipmentSelection(props) {
  const { equipment } = props;
  const iconColor = useColorModeValue(
    "",
    "invert(100%) sepia(0%) saturate(2%) hue-rotate(142deg) brightness(105%) contrast(101%)"
  );

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Card p="30px">
      <Text fontSize="lg" lineHeight="100%" color={textColor} fontWeight="bold">
        Equipment
      </Text>
      <SimpleGrid columns={{ sm: 3, md: 4 }} gap="20px" w="100%" pt="30px">
        {equipment?.map((item) => (
          <VStack>
            <Image
              src={`/svg/equipment/${item.equipmentName
                .toLowerCase()
                .replaceAll(" ", "-")}.svg`}
              width="100%"
              height="40px"
              borderRadius="15px"
              filter={iconColor}
            />
            <Text mb={0}>{item.equipmentName}</Text>
          </VStack>
        ))}
      </SimpleGrid>
      <SimpleGrid columns={{ sm: 1, md: 3 }} gap="20px" w="100%" mt="50px">
        <Flex direction="column">
          <LogLineItem
            mb="20px"
            name="Wetsuit"
            date="5mm"
            // sum="5mm"
            icon={
              <Icon
                as={GiSpaceSuit}
                // color={blueIcon}
                w="20px"
                h="18px"
              />
            }
          />
        </Flex>
        <Flex direction="column">
          <LogLineItem
            mb="20px"
            name="Tank"
            date="21L Aluminium"
            // sum="5mm"
            icon={
              <Icon
                as={GiScubaTanks}
                // color={blueIcon}
                w="20px"
                h="18px"
              />
            }
          />
        </Flex>
        <Flex direction="column">
          <LogLineItem
            mb="20px"
            name="Weights"
            date="8 kg"
            // sum="5mm"
            icon={
              <Icon
                as={FaWeightHanging}
                // color={blueIcon}
                w="20px"
                h="18px"
              />
            }
          />
        </Flex>
      </SimpleGrid>
    </Card>
  );
}
