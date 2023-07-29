/* eslint-disable import/no-extraneous-dependencies */
import {
  Button,
  Icon,
  Tooltip,
  // useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

export default function DarkModeMenuItem(props) {
  const { iconColor } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  // const navbarIcon = useColorModeValue("gray.400", "white");

  return (
    <Tooltip
      label={colorMode === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode"}
    >
      <Button
        variant="no-hover"
        bg="transparent"
        // p="0px"
        minW="unset"
        minH="unset"
        h="18px"
        w="max-content"
        onClick={toggleColorMode}
      >
        <Icon
          h="18px"
          w="18px"
          color={iconColor}
          as={colorMode === "light" ? IoMdMoon : IoMdSunny}
        />
      </Button>
    </Tooltip>
  );
}

DarkModeMenuItem.propTypes = {
  iconColor: PropTypes.string,
};
