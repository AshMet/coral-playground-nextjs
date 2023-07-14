/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// Chakra imports
import {
  Button,
  Flex,
  FormLabel,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

import Card from "components/card/Card";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";

export default function Info(props) {
  const { profile, setProfile, updateProfile, loading } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";
  const supabase = useSupabaseClient();
  const user = useUser();

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card>
      <Flex direction="column" mb="40px" ms="10px">
        <Text fontSize="xl" color={textColorPrimary} fontWeight="bold">
          Account Settings
        </Text>
        <Text fontSize="md" color={textColorSecondary}>
          Here you can change user account information
        </Text>
      </Flex>
      <SimpleGrid
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <InputField
          mb="25px"
          me="30px"
          name="username"
          label="Username"
          placeholder="@username"
          value={profile?.username || user?.user_metadata.username || ""}
          onChange={handleProfileChange}
        />
        <InputField
          mb="25px"
          name="email"
          label="Email Address"
          placeholder="example@email.com"
          value={user?.email}
          disabled
        />
        <InputField
          mb="25px"
          me="30px"
          name="firstName"
          label="First Name"
          // placeholder="John"
          value={profile?.firstName}
          onChange={handleProfileChange}
        />
        <InputField
          mb="25px"
          label="Last Name"
          name="lastName"
          // placeholder="John"
          value={profile?.lastName}
          onChange={handleProfileChange}
        />
      </SimpleGrid>
      {/* <InputField
          id="certification"
          label="Current Certification Level"
          placeholder="Open Water"
          name="certLevel"
          value={profile?.certLevel}
          onChange={handleProfileChange}
        /> */}
      <Flex direction="column" mb="40px">
        <FormLabel
          ms="10px"
          htmlFor="checkIn"
          fontSize="sm"
          fontWeight="bold"
          _placeholder={{ color: "secondaryGray.600" }}
          _hover={{ cursor: "pointer" }}
        >
          Current Certification Level: {profile?.divingCert || "Not set"}
        </FormLabel>
        <Select
          fontSize="sm"
          name="divingCert"
          variant="main"
          h="44px"
          maxh="44px"
          placeholder="Select..."
          borderColor={useColorModeValue("secondaryGray.100", "whiteAlpha.100")}
          // defaultValue={2}
          value={profile?.certification}
          onChange={handleProfileChange}
        >
          <option value="Open Water">Open Water</option>
          <option value="Advanced Diver">Advanced Diver</option>
          <option value="Rescue Diver">Rescue Diver</option>
          <option value="Dive Master">Dive Master</option>
          <option value="Unlicenced">Unlicenced</option>
        </Select>
      </Flex>
      <TextField
        id="about"
        label="About Me"
        h="100px"
        placeholder="Tell something about yourself in 150 characters!"
        name="bio"
        value={profile?.bio}
        onChange={handleProfileChange}
      />
      <SimpleGrid
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <Button
          variant="solid"
          bgColor="brand.400"
          minW="100%"
          fontSize="sm"
          fontWeight="500"
          ms="auto"
          _hover={{ bgColor: "brand.300" }}
          onClick={updateProfile}
          // disabled={profileLoading}
        >
          {loading ? "Loading ..." : "Update"}
        </Button>
        <Button
          variant="outline"
          minW="100%"
          fontSize="sm"
          fontWeight="500"
          ms="auto"
          _hover={{ bgColor: "brand.100" }}
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </Button>
      </SimpleGrid>
    </Card>
  );
}
