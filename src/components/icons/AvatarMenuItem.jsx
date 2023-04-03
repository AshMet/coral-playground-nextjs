/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable import/no-cycle */
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom Components
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoLogOutOutline, IoWalletOutline } from "react-icons/io5";

import { ProfileIcon } from "components/icons/Icons";

function SignedOutMenuList({ iconColor }) {
  const defaultColor = useColorModeValue("navy.800", "white");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  const router = useRouter();

  return (
    <Menu>
      <MenuButton p="0px">
        <Icon
          as={HiOutlineUserCircle}
          color={iconColor || defaultColor}
          w="20px"
          h="20px"
          p="0px"
          mb="-6px"
        />
        {/* <HiOutlineUserCircle color={iconColor} size={20} /> */}
      </MenuButton>
      <MenuList
        boxShadow={shadow}
        p="0px"
        mt="10px"
        borderRadius="20px"
        bg={defaultColor}
        border="none"
      >
        <Flex flexDirection="column" p="10px">
          <MenuItem
            _hover={{ bg: "none" }}
            _focus={{ bg: "none" }}
            borderRadius="8px"
            px="14px"
          >
            <Button
              variant="link"
              size="sm"
              color="teal"
              leftIcon={<ProfileIcon />}
              onClick={() => router.push("/auth/login")}
            >
              Sign In
            </Button>
          </MenuItem>
          <MenuItem
            _hover={{ bg: "none" }}
            _focus={{ bg: "none" }}
            color="red.400"
            borderRadius="8px"
            px="14px"
          >
            <Button
              variant="link"
              size="sm"
              mt={1}
              mr={4}
              leftIcon={<IoWalletOutline />}
              onClick={() => router.push("/auth/signup")}
            >
              Sign Up
            </Button>
          </MenuItem>
        </Flex>
      </MenuList>
    </Menu>
  );
}

function SignedInMenuList() {
  // const defaultColor = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const navbarIcon = useColorModeValue("gray.400", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  return (
    <Menu>
      <MenuButton p="0px">
        <Avatar
          _hover={{ cursor: "pointer" }}
          color="white"
          // name={user.email}
          src={
            user?.user_metadata.avatar_url ||
            `https://avatars.dicebear.com/api/miniavs/${user.email}.svg`
          }
          size="sm"
          w="40px"
          h="40px"
        />
      </MenuButton>
      <MenuList
        boxShadow={shadow}
        p="0px"
        mt="10px"
        borderRadius="20px"
        // bg={defaultColor}
        border="none"
      >
        <Flex w="100%" mb="0px">
          <Text
            ps="20px"
            pt="16px"
            pb="10px"
            w="100%"
            pr="15px"
            borderBottom="1px solid"
            borderColor={borderColor}
            fontSize="sm"
            fontWeight="700"
            color={textColor}
          >
            {/* {user.attributes.accounts[0].substring(0, 7)} {` ...... `}
            {user.attributes.accounts[0].slice(-7)} */}
            {user?.user_metadata.username || user.email}
          </Text>
        </Flex>
        <Flex flexDirection="column" p="10px">
          <MenuItem
            _hover={{ bg: "none" }}
            _focus={{ bg: "none" }}
            borderRadius="8px"
            px="14px"
          >
            <Button
              variant="link"
              size="sm"
              mr={4}
              leftIcon={<ProfileIcon />}
              onClick={() => router.push("/users/me")}
            >
              Profile
            </Button>
          </MenuItem>
          <MenuItem
            _hover={{ bg: "none" }}
            _focus={{ bg: "none" }}
            color="red.400"
            borderRadius="8px"
            px="14px"
          >
            <Button
              // isLoading={isAuthenticating}
              onClick={() => supabase.auth.signOut()}
              variant="link"
              colorScheme="red"
              size="sm"
              mr={4}
              leftIcon={
                <IoLogOutOutline
                  color={navbarIcon}
                  w="22px"
                  h="22px"
                  me="0px"
                  ml="5"
                />
              }
            >
              Log Out
            </Button>
          </MenuItem>
        </Flex>
      </MenuList>
    </Menu>
  );
}

export default function AvatarMenuItem(props) {
  const { iconColor, secondary } = props;
  const user = useUser();
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );

  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      // p="10px"
      borderRadius="30px"
      boxShadow={shadow}
    >
      {user ? (
        <SignedInMenuList />
      ) : (
        <SignedOutMenuList iconColor={iconColor} />
      )}
    </Flex>
  );
}

AvatarMenuItem.propTypes = {
  iconColor: PropTypes.string,
  secondary: PropTypes.bool,
};

SignedOutMenuList.propTypes = {
  iconColor: PropTypes.string,
};
