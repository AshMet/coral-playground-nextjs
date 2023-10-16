/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import { Flex, Text, useColorModeValue, Icon, Divider } from "@chakra-ui/react";
import { MdAddCircle } from "react-icons/md";

// import EquipLineItem from "components/dataDisplay/EquipLineItem";
import Card from "components/card/Card";
import CertLineItem from "components/dataDisplay/CertLineItem";

export default function CertsTab(props) {
  const { centreCerts } = props;

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Card>
      <Text color="grey.500" fontSize="md" fontWeight="500" mb="20px">
        Select any certification course you would like to register for
      </Text>
      <Flex direction="column" w="100%">
        <Flex wrap="wrap">
          {centreCerts?.length > 0 ? (
            centreCerts.map((cert, index) => (
              <Flex
                key={cert.id}
                direction="column"
                justify="space-between"
                align="center"
                w="100%"
              >
                <CertLineItem
                  centreCert={cert}
                  // tripRules={getFilteredRules(trip, dateRange)}
                  icon={
                    <Icon
                      as={MdAddCircle}
                      color={textColor}
                      w="20px"
                      h="18px"
                    />
                  }
                />
                {centreCerts?.length > index + 1 && <Divider my="25px" />}
              </Flex>
            ))
          ) : (
            <Text fontSize="md" fontWeight="500" color="textColor" mb="30px">
              No Dive Trips are scheduled for your selected dates. Please modify
              your dates or check back soon, new trips are added regularly
            </Text>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}
