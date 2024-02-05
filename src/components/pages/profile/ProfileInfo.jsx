/* eslint-disable react/prop-types */
// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";
import BasicInfoTile from "components/dataDisplay/BasicInfoTile";

// Assets
export default function ProfileInfo(props) {
  const { profile, ...rest } = props;
  const { firstName, lastName, divingCert, bio } = profile;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        Diver Stats
      </Text>
      <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
        Build up your profile to earn rewards, get diving recommendations and
        connect with other divers.
      </Text>
      <SimpleGrid columns="2" gap="20px">
        <BasicInfoTile title="Full Name" value={`${firstName} ${lastName}`} />
        <BasicInfoTile title="Certification Level" value={divingCert} />
        {/* <BasicInfoTile title="Dives Logged" value="23" />
        <BasicInfoTile title="Dives Booked" value="3" />
        <BasicInfoTile title="Favorite Dive Sites" value="19" />
        <BasicInfoTile title="Favorite Dive Centres" value="2" />
        <BasicInfoTile title="Photos Submitted" value="34" />
        <BasicInfoTile title="Reviews Submitted" value="14" /> */}
      </SimpleGrid>
      <BasicInfoTile title="Bio" value={bio} mt="20px" />
    </Card>
  );
}
