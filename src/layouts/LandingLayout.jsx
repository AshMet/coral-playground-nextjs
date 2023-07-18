/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/no-cycle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
// Chakra imports
import { Box, Flex, Text } from "@chakra-ui/react";
// Custom components
// import { usePostHog } from "posthog-js/react";
import PropTypes from "prop-types";

import Footer from "components/footer/FooterLanding";
import Navbar from "components/navbar/NavbarLanding";
// import SidebarContext from "../../../contexts/SidebarContext";
// import React from "react";

function AuthCentered(props) {
  // const [toggleSidebar, setToggleSidebar] = useState(false);
  const { children, title, description, image } = props; // , cardTop, cardBottom
  // const user = useUser();
  // const posthog = usePostHog();

  // useEffect(() => {
  //   if (user) {
  //     posthog?.identify(
  //       user.email, // distinctId
  //       {
  //         role: user?.user_metadata.role,
  //         first_name: user?.user_metadata.first_name,
  //         last_name: user?.user_metadata.last_name,
  //       }
  //     );
  //   }
  // }, [posthog, user]);

  return (
    // <Box>
    //   <SidebarContext.Provider
    //     value={{
    //       toggleSidebar,
    //       setToggleSidebar,
    //     }}
    //   >
    //     <Box
    //       float="right"
    //       minHeight="100vh"
    //       height="100%"
    //       position="relative"
    //       w="100%"
    //       transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
    //       transitionDuration=".2s, .2s, .35s"
    //       transitionProperty="top, bottom, width"
    //       transitionTimingFunction="linear, linear, ease"
    //     >
    //       <Box mx="auto" minH="100vh">
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
      mx="0px"
      minH="100vh"
    >
      {/* <FixedPlugin /> */}
      <Box
        position="absolute"
        minH={{ base: "50vh", md: "50vh" }}
        maxH={{ base: "50vh", md: "50vh" }}
        w={{ md: "calc(100vw)" }}
        maxW={{ md: "calc(100vw)" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={image}
        bgSize="cover"
        mx={{ md: "auto" }}
      />
      <Navbar secondaryNavbar={false} />
      <Box
      // w={{ base: "100%", md: "max-content" }}
      // h="max-content"
      // mx="auto"
      // maxW="100%"
      // mt={cardTop}
      // mb={cardBottom}
      // p={{ base: "10px", md: "50px" }}
      // pt={{ base: "30px", md: "50px" }}
      >
        {title && description ? (
          <Flex
            direction="column"
            textAlign="center"
            justifyContent="center"
            align="center"
            mt="125px"
            mb="30px"
          >
            <Text fontSize="4xl" color="white" fontWeight="bold">
              {title}
            </Text>
            <Text
              fontSize="md"
              color="white"
              fontWeight="normal"
              mt="10px"
              mb="26px"
              w={{ base: "90%", sm: "60%", lg: "40%", xl: "333px" }}
            >
              {description}
            </Text>
          </Flex>
        ) : null}
        {children}
      </Box>
      <Footer />
    </Flex>
    //       </Box>
    //     </Box>
    //   </SidebarContext.Provider>
    // </Box>
  );
}
// PROPS

AuthCentered.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.any,
};

export default AuthCentered;
