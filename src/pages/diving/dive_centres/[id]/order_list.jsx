/* eslint-disable react/prop-types */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___  
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \ 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/ 
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Flex } from "@chakra-ui/react";

import { supabase } from "../../../api/index";
import Card from "components/card/Card";
import SearchTableOrders from "components/pages/orders/SearchTableOrders";
import DivingLayout from "layouts/DivingLayout";

const columnsDataOrders = [
  {
    Header: "USER NAME",
    accessor: "name",
  },
  {
    Header: "EMAIL",
    accessor: "email",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "STATUS ORDER",
    accessor: "status",
  },
  {
    Header: "TOTAL PRICE",
    accessor: "price",
  },
  {
    Header: "ORDER ACTIONS",
    accessor: "actions",
  },
];

export default function OrdersList({ orders }) {
  const tableDataOrders = orders
    // .filter((order) => trip.start_date === null)
    .map((order) => ({
      id: order.id,
      name: order.diverName,
      price: `€${(order.amountTotal / 100).toFixed(2)}`,
      date: new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      status: order.status,
      actions: "Actions",
    }));
  return (
    <Flex direction="column" pt={{ sm: "125px", lg: "75px" }}>
      <Card px="0px">
        <SearchTableOrders
          tableData={tableDataOrders}
          columnsData={columnsDataOrders}
        />
      </Card>
    </Flex>
  );
}

export const getServerSideProps = async ({ params: { id } }) => {
  const { data: trips } = await supabase
    .from("dive_trips")
    .select("id")
    .eq("dive_centre_id", id);

  // console.log("trip list:", trips);

  const tripIds = trips.map((trip) => trip.id);

  // console.log("trip ids:", tripIds);
  const { data: orderJoins } = await supabase
    .from("order_trips")
    .select("*")
    .in("dive_trip_id", tripIds);

  // console.log("orderJoins:", orderJoins);
  const orderIds = orderJoins.map((order) => order.order_id);
  // console.log("orderIds:", orderIds);

  const { data: orders } = await supabase
    .from("orders_view")
    .select("*")
    .in("id", orderIds)
    .order("createdAt", { ascending: true });

  // const { data: orders } = await supabase
  //   .from("orders_view")
  //   .select("*")
  //   // .eq("dive_centre_id", id)
  //   .order("createdAt", { ascending: true });

  // const { data } = await supabase.from("dive_centres").select(
  //   `
  //       id,
  //       dive_trips: order_trips!dive_trip_id(
  //         dive_trip: "*",
  //           orders: order_trips!dive_trip_id(
  //             order:dive_site_id("*"),
  //         )
  //       )
  //     `
  // );

  // console.log("dadta", data);
  // .eq("dive_centre_id", id)
  // .order("createdAt", { ascending: true });

  return {
    props: {
      orders,
    },
  };
};

OrdersList.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
