/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable func-names */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Icon,
} from "@chakra-ui/react";
// Custom components
import { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";

import Card from "components/card/Card";
import SectionTab from "components/menu/SectionTab";

import CertsTab from "./CertsTab";
import CollectionTab from "./CollectionTab";
import DetailsTab from "./DetailsTab";
import EquipmentTab from "./EquipmentTab";
import ReviewsTab from "./ReviewsTab";

// import DetailsTab from "./DetailsTab";
// import Instructor from "./Instructor";
// import Rating from "./Rating";

export default function CentreInfo(props) {
  const { diveCentre, equipment, centreCerts } = props;
  const {
    id,
    name,
    description,
    address,
    city,
    country,
    services,
    paymentMethods,
    languages,
    memberships,
  } = diveCentre;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorTertiary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.500"
  );
  const [tabState, setTabState] = useState("about");

  return (
    <Card mt="20px" p={{ base: "20px", md: "20px 40px" }}>
      <Flex align="center" w="100%">
        <Text as="h1" color={textColor} fontSize="3xl" fontWeight="bold">
          {name}
        </Text>
      </Flex>
      <Flex mb="30px" alignSelf="start" cursor="pointer">
        <Icon
          as={HiOutlineLocationMarker}
          ms="auto"
          h="22px"
          w="22px"
          mr="10px"
          color={textColorTertiary}
        />
        <Text color={textColorTertiary} fontWeight="500" fontSize="md" me="5px">
          {address} - {`${city}, ${country}`}
        </Text>
      </Flex>
      <Box w="100%" mb="40px">
        <Flex direction={{ base: "column", "3xl": "row" }}>
          <Box me={{ md: "40px", "3xl": "40px" }}>
            <Tabs variant="soft-rounded" colorScheme="brandTabs" mb="10px">
              <TabList overflowX={{ sm: "scroll", lg: "unset" }} pt="10px">
                <Flex>
                  <SectionTab
                    title="About Us"
                    stateName="about"
                    tabState={tabState}
                    setTabState={setTabState}
                  />
                  <SectionTab
                    title="Equipment"
                    stateName="equip"
                    counterItem={equipment}
                    tabState={tabState}
                    setTabState={setTabState}
                  />
                  <SectionTab
                    title="Courses"
                    stateName="certs"
                    counterItem={centreCerts}
                    tabState={tabState}
                    setTabState={setTabState}
                  />
                  <SectionTab
                    title="Services"
                    stateName="services"
                    tabState={tabState}
                    setTabState={setTabState}
                  />
                  <SectionTab
                    title="Reviews"
                    stateName="reviews"
                    tabState={tabState}
                    setTabState={setTabState}
                  />
                </Flex>
              </TabList>
              <TabPanels pt="30px">
                <TabPanel px="0px">
                  <DetailsTab
                    description={description}
                    paymentMethods={paymentMethods}
                    languages={languages}
                    memberships={memberships}
                  />
                </TabPanel>
                <TabPanel px="0px">
                  <EquipmentTab
                    // summaryTab={summaryTab}
                    equipment={equipment}
                  />
                </TabPanel>
                <TabPanel px="0px">
                  <CertsTab
                    // summaryTab={summaryTab}
                    centreCerts={centreCerts}
                  />
                </TabPanel>
                <TabPanel px="0px">
                  <CollectionTab
                    collection={services}
                    folderUrl="/svg/services"
                    extension="svg"
                  />
                </TabPanel>
                <TabPanel px="0px">
                  <ReviewsTab centreId={id} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          <Box
            mx={{ base: "auto", xl: "unset" }}
            maxW={{
              sm: "100%",
              md: "550px",
              lg: "500px",
              "2xl": "800px",
              "3xl": "300px",
            }}
          >
            {/* <Instructor /> */}
          </Box>
        </Flex>
      </Box>
    </Card>
  );
}
