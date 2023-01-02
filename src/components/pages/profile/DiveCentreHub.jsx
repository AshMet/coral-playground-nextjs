/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  // Center,
  Flex,
  Icon,
  Image,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import {} from "react-icons/io";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { MdOutlineFavoriteBorder, MdAdd } from "react-icons/md";

// Custom components
import Card from "components/card/Card";
import OwnerDiveCentreMenu from "components/pages/profile/OwnerDiveCentreMenu";

// import SeeStory from "components/actions/SeeStory";

export default function DiveCentreHub(props) {
  const { username, trips, galleryImages, userId, ...rest } = props;
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgAdd = useColorModeValue("white", "navy.800");
  const [loading, setLoading] = useState(true);
  const [ownerDiveCentre, setOwnerDiveCentre] = useState(true);
  const supabase = useSupabaseClient();
  const router = useRouter();

  async function getOwnerDiveCentre() {
    try {
      setLoading(true);

      const {
        data: diveCentre,
        error,
        status,
      } = await supabase
        .from("dive_centres")
        .select("*")
        .eq("owner_id", userId)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      // console.log("centre", diveCentre);
      if (diveCentre) {
        setOwnerDiveCentre(diveCentre);
      }
    } catch (error) {
      // console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOwnerDiveCentre();
  }, []);

  return loading ? (
    <Card p={{ base: "15px", md: "30px" }} {...rest}>
      <Spinner size="lg" />
    </Card>
  ) : (
    <Card p={{ base: "15px", md: "30px" }} {...rest}>
      {ownerDiveCentre.id ? (
        <Box mb="45px" w="100%">
          <Flex justify="space-between" align="center" w="100%">
            <Flex>
              <Flex direction="column">
                <Text fontSize="md" color={textColor} fontWeight="700">
                  {ownerDiveCentre.name}
                </Text>
                <Text fontSize="sm" color="gray.500" fontWeight="500">
                  {username}
                </Text>
              </Flex>
            </Flex>
            <OwnerDiveCentreMenu
              diveCentreId={ownerDiveCentre.id}
              icon={
                <Icon
                  as={IoEllipsisHorizontal}
                  w="24px"
                  h="24px"
                  color={textColor}
                />
              }
            />
          </Flex>
        </Box>
      ) : (
        <Flex direction="column">
          <Text mb="10px"> Current user is not managing any dive centres </Text>
          <Button
            bg="transparent"
            variant="no-hover"
            fontWeight="700"
            display="flex"
            h="max-content"
            w="max-content"
            minW="max-content"
            boxShadow="unset"
            flexDirection="column"
            onClick={() => router.push("/diving/dive_centres/new")}
          >
            <Flex
              mx="auto"
              h="max-content"
              w="max-content"
              p="3px"
              borderRadius="50%"
              bg="linear-gradient(179.78deg, #7A64FF 0.23%, #FF508B 66.58%, #FD6D53 99.75%, #FD6D53 99.75%);
              
              "
            >
              <Flex
                borderRadius="50px"
                align="center"
                justify="center"
                bg={bgAdd}
                w="54px"
                h="54px"
              >
                <Icon as={MdAdd} color={textColor} w="24px" h="24px" />
              </Flex>
            </Flex>
            <Text
              mt="10px"
              textAlign="center"
              color={textColor}
              fontSize="sm"
              fontWeight="500"
            >
              Create Dive Centre
            </Text>
          </Button>
        </Flex>
      )}

      <Flex direction="column">
        <Image
          src={ownerDiveCentre.cover_photo}
          minW={{ sm: "270px" }}
          h="auto"
          borderRadius="16px"
          mb="30px"
        />
        <Box px={{ md: "20px" }}>
          <Flex justify="space-between" align="center" mb="30px">
            <Flex align="center" color={textColor}>
              <Icon
                as={MdOutlineFavoriteBorder}
                w="18px"
                h="18px"
                me="4px"
                cursor="pointer"
              />
              <Text fontSize="md" fontWeight="500">
                {trips}
                <Text
                  as="span"
                  display={{ base: "none", md: "unset" }}
                  fontSize="md"
                  fontWeight="500"
                >
                  {" "}
                  Dive Trips
                </Text>
              </Text>
            </Flex>
            <Flex align="center" color={textColor}>
              <Icon
                as={FaRegCommentDots}
                w="18px"
                h="18px"
                me="4px"
                cursor="pointer"
              />
              <Text fontSize="md" fontWeight="500">
                {galleryImages}
                <Text
                  as="span"
                  display={{ base: "none", md: "unset" }}
                  fontSize="md"
                  fontWeight="500"
                >
                  {" "}
                  Images
                </Text>
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}
