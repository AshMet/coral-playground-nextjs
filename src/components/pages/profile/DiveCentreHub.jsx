import {
  Box,
  Button,
  Flex,
  Icon,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import {} from "react-icons/io";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { MdOutlineFavoriteBorder, MdAdd } from "react-icons/md";

import Card from "components/card/Card";
import ImageUploader from "components/pages/diveCentre/ImageUploader";
import OwnerDiveCentreMenu from "components/pages/profile/OwnerDiveCentreMenu";
import { ProfileContext } from "contexts/ProfileContext";

export default function DiveCentreHub(props) {
  const { ...rest } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgAdd = useColorModeValue("white", "navy.800");
  const { username, ownerDiveCentre, diveCentreLoading } =
    useContext(ProfileContext);
  const router = useRouter();

  return diveCentreLoading ? (
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
        <ImageUploader
          diveCentreId={ownerDiveCentre.id}
          coverPhoto={ownerDiveCentre.cover_photo}
        />
        {/* <Image
          src={ownerDiveCentre.cover_photo}
          minW={{ sm: "270px" }}
          h="auto"
          borderRadius="16px"
          mb="30px"
        /> */}
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
                7
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
                38
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
