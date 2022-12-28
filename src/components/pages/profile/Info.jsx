/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

import Card from "components/card/Card";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";

export default function Info({
  username,
  setUsername,
  updateProfile,
  loading,
}) {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";
  const supabase = useSupabaseClient();
  const user = useUser();

  return (
    <FormControl>
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
            id="username"
            label="Username"
            placeholder="@username"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            mb="25px"
            id="email"
            label="Email Address"
            placeholder="example@email.com"
            value={user.email}
            disabled
          />
          <InputField
            mb="25px"
            me="30px"
            id="first_name"
            label="First Name"
            placeholder="John"
          />
          <InputField
            mb="25px"
            id="last_name"
            label="Last Name"
            placeholder="Doe"
          />
        </SimpleGrid>
        <InputField
          id="certification"
          label="Current Certification Level"
          placeholder="Open Water Certification"
        />
        <TextField
          id="about"
          label="About Me"
          h="100px"
          placeholder="Tell something about yourself in 150 characters!"
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
            onClick={() => updateProfile({ username })}
            disabled={loading}
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
    </FormControl>
  );
}
