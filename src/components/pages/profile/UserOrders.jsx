/* eslint-disable consistent-return */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsShop } from "react-icons/bs";
import { TbScubaMask } from "react-icons/tb";

import Card from "components/card/Card";

import OrderCard from "./OrderCard";

export default function UserOrders() {
  const textColor = useColorModeValue("gray.700", "white");
  const bgAdd = useColorModeValue("white", "navy.800");
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const [orders, setUserOrders] = useState([]);

  async function getUserOrders() {
    if (!user) {
      return null;
    }
    const { data } = await supabase
      .from("orders_view")
      .select()
      .eq("userId", user.id)
      .eq("status", "paid");
    if (data) {
      setUserOrders(data);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return orders.length > 0 ? (
    <Box mb="45px" w="100%">
      <Flex direction="column" justify="space-between" align="center" w="100%">
        {/* <Flex>
              <Flex direction="column">
                <Text fontSize="md" color={textColor} fontWeight="700">
                  Current Orders
                </Text>
                <Text fontSize="sm" color="gray.500" fontWeight="500">
                  Current Orders
                </Text>
              </Flex>
            </Flex> */}
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            orderId={order.id}
            diverName={order.diverName}
            createdAt={order.createdAt}
            paid={(order.amountPaid / 100).toFixed(2)}
            totalCost={(order.amountTotal / 100).toFixed(2)}
            currency={order.currency}
            status={order.status}
            tripCount={order.tripCount}
            certCount={order.certCount}
            equipmentCount={order.equipmentCount}
            sessionId={order.stripeSessionId}
          />
        ))}
      </Flex>
    </Box>
  ) : (
    <Box mb="45px" w="100%">
      <Flex direction="column" justify="space-between" align="center" w="100%">
        <Card p={{ base: "15px", md: "30px" }} mb="10px">
          <Center>
            <Flex direction="column">
              <Text mb="10px">
                {" "}
                You have not booked any dives yet. Get started by adding dive
                trips for any dive site or dive centre page.
              </Text>
              <Flex direction="row">
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
                  onClick={() => router.push("/dive_centres")}
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
                      <Icon as={BsShop} color={textColor} w="24px" h="24px" />
                    </Flex>
                  </Flex>
                  <Text
                    mt="10px"
                    textAlign="center"
                    color={textColor}
                    fontSize="sm"
                    fontWeight="500"
                  >
                    View Dive Centres
                  </Text>
                </Button>
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
                  onClick={() => router.push("/dive_sites")}
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
                      <Icon
                        as={TbScubaMask}
                        color={textColor}
                        w="24px"
                        h="24px"
                      />
                    </Flex>
                  </Flex>
                  <Text
                    mt="10px"
                    textAlign="center"
                    color={textColor}
                    fontSize="sm"
                    fontWeight="500"
                  >
                    View Dive Sites
                  </Text>
                </Button>
              </Flex>
            </Flex>
          </Center>
        </Card>
      </Flex>
    </Box>
  );
}
