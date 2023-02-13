import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import {} from "react-icons/io";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { MdAdd } from "react-icons/md";

import SetUp from "components/actions/SetUp";
import Card from "components/card/Card";
import SwitchField from "components/fields/SwitchField";
import ImageUploader from "components/pages/diveCentre/ImageUploader";
import OwnerDiveCentreMenu from "components/pages/profile/OwnerDiveCentreMenu";
import { ProfileContext } from "contexts/ProfileContext";

export default function DiveCentreHub(props) {
  const { ...rest } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("secondaryGray.400", "whiteAlpha.100");
  const bgAdd = useColorModeValue("white", "navy.800");
  const { ownerDiveCentre, diveCentreLoading } = useContext(ProfileContext);
  const router = useRouter();

  return diveCentreLoading ? (
    <Card p={{ base: "15px", md: "30px" }} {...rest}>
      <Spinner size="lg" />
    </Card>
  ) : (
    <Card p={{ base: "15px", md: "30px" }} {...rest}>
      {ownerDiveCentre ? (
        <>
          <Box mb="45px" w="100%">
            <Flex justify="space-between" align="center" w="100%">
              <Flex>
                <Flex direction="column">
                  <Text fontSize="md" color={textColor} fontWeight="700">
                    {ownerDiveCentre.name}
                  </Text>
                  <Text fontSize="sm" color="gray.500" fontWeight="500">
                    Dive Centre
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
          <ImageUploader
            diveCentre={ownerDiveCentre}
            // coverPhoto={ownerDiveCentre.cover_photo}
          />
          <SimpleGrid
            columns={{ sm: 1, md: 1, xl: 1 }}
            spacing={{ base: "20px", xl: "0px" }}
          >
            <SwitchField
              mb="25px"
              me="30px"
              id="1"
              label="Status: Active"
              desc="If disabled, your dive centre will no longer appear in the search results and will no longer be able to receive any new bookings. This can be changed back at any time."
            />
            <SetUp
              py="20px"
              borderBottom="1px solid"
              borderColor={borderColor}
              name="View Dive Centre page"
              value="Active"
              actionName="View"
              action={() =>
                router.push(`/diving/dive_centres/${ownerDiveCentre.id}`)
              }
            />
            <SetUp
              py="20px"
              borderBottom="1px solid"
              borderColor={borderColor}
              name="Make changes"
              value="Last change: 34/07/2022"
              actionName="Edit"
              action={() =>
                router.push(`/diving/dive_centres/${ownerDiveCentre.id}/edit`)
              }
            />
            <SetUp
              py="20px"
              borderBottom="1px solid"
              borderColor={borderColor}
              name="Add Dive Trips"
              value="Available: 7"
              actionName="Add"
              action={() =>
                router.push(
                  `/diving/dive_centres/${ownerDiveCentre.id}/dive_trips/new`
                )
              }
            />
            <SetUp
              pt="20px"
              name="Archive Dive Centre"
              value="Cannot be Undone!"
              actionName="Delete"
              btnColor="brand.100"
            />
          </SimpleGrid>
        </>
      ) : (
        <Center>
          <Flex direction="column">
            <Text mb="10px">
              {" "}
              You have not set up your dive centre yet. Get Started Below:{" "}
            </Text>
            <Button
              bg="transparent"
              variant="no-hover"
              fontWeight="700"
              display="flex"
              h="max-content"
              w="max-content"
              mx="auto"
              my="30px"
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
        </Center>
      )}
    </Card>
  );
}
