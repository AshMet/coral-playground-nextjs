import { extendTheme } from "@chakra-ui/react";

import colors from "./colors";
import Button from "./components/button";
import fonts from "./fonts";

const customTheme = extendTheme({
  fonts,
  colors,
  config: {
    useSystemColorMode: true,
    initialColorMode: "dark",
  },
  components: {
    Button,
  },
});

export default customTheme;
