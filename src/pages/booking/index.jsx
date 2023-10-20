import { Box, Grid, useColorModeValue } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useContext, useRef } from "react";
// import { useReactToPrint } from "react-to-print";
// import Details from "views/admin/main/ecommerce/orderDetails/components/Details";
// import OrderStatus from "views/admin/main/ecommerce/orderDetails/components/OrderStatus";
// import Receipt from "views/admin/main/ecommerce/orderDetails/components/Receipt";

import DiverInfo from "components/pages/bookings/DiverInfo";
import SummaryTable from "components/pages/bookings/SummaryTable";
import { CartContext } from "contexts/CartContext";
import DivingLayout from "layouts/DivingLayout";

export default function NewBooking() {
  const textColor = useColorModeValue("gray.700", "white");
  const bgButton = "rgba(255,255,255,0.12)";
  const bgHover = { bg: "whiteAlpha.50" };
  const bgFocus = { bg: "rgba(255,255,255,0.12)" };

  const componentRef = useRef();
  const { cartItems } = useContext(CartContext);

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  return (
    <>
      <NextSeo
        title="Dive Booking"
        description="Complete your booking details and proceed to payment"
        canonical="https://www.coralplayground.com/booking"
      />
      <Box>
        <Grid
          mb="20px"
          templateColumns={{ base: "2.4fr 1fr", lg: "2.2fr 1.2fr" }}
          direction="column"
          pt={{ base: "130px", md: "80px", xl: "80px" }}
        >
          <SummaryTable
            lineItems={cartItems}
            me="20px"
            gridArea={{ base: "1 / 1 / 2 / 3", lg: "1 / 1 / 2 / 2" }}
            ref={componentRef}
            // handlePrint={handlePrint}
            textColor={textColor}
            bgButton={bgButton}
            bgHover={bgHover}
            bgFocus={bgFocus}
          />
          <DiverInfo
            mb="20px"
            ms={{ base: "0px", lg: "20px" }}
            mt={{ base: "20px", lg: "0px" }}
            zIndex="0"
            gridArea={{ base: "2 / 1 / 3 / 3", lg: "1 / 2 / 2 / 3" }}
          />
        </Grid>
        {/* <Details /> */}
      </Box>
    </>
  );
}

NewBooking.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
