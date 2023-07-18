/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
// import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { FaChevronLeft } from "react-icons/fa";

import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import Footer from "components/footer/FooterDiving";

function LoginLayout(props) {
  const { children, illustrationBackground } = props;
  const router = useRouter();

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
  // }, [user]);

  return (
    <Flex position="relative" h="max-content">
      <Flex
        h={{
          sm: "initial",
          md: "unset",
          lg: "100vh",
          xl: "97vh",
        }}
        w="100%"
        maxW={{ md: "66%", lg: "1313px" }}
        mx="auto"
        pt={{ sm: "50px", md: "0px" }}
        px={{ lg: "30px", xl: "0px" }}
        ps={{ xl: "70px" }}
        justifyContent="start"
        direction="column"
      >
        <Button
          // as="link"
          variant="link"
          width="fit-content"
          mt="40px"
          onClick={() => router.back()}
        >
          <Flex
            align="center"
            ps={{ base: "25px", lg: "0px" }}
            pt={{ lg: "0px", xl: "0px" }}
            w="fit-content"
          >
            <Icon
              as={FaChevronLeft}
              me="12px"
              h="13px"
              w="8px"
              color="secondaryGray.600"
            />
            <Text ms="0px" fontSize="sm" color="secondaryGray.600">
              Back to Coral Playground
            </Text>
          </Flex>
        </Button>
        {/* Insert template body here */}
        {children}
        {/* Insert template body here */}
        <Box
          display={{ base: "none", md: "block" }}
          h="100%"
          minH="100vh"
          w={{ lg: "50vw", "2xl": "44vw" }}
          position="absolute"
          right="0px"
        >
          <Flex
            bg={`url(${illustrationBackground})`}
            justify="center"
            align="end"
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius={{ lg: "120px", xl: "200px" }}
          />
        </Box>
        <Footer />
      </Flex>
      <FixedPlugin />
    </Flex>
  );
}
// PROPS

// LoginLayout.propTypes = {
//   illustrationBackground: PropTypes.string,
//   image: PropTypes.any,
// };

export default LoginLayout;
