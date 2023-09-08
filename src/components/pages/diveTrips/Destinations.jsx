/* eslint-disable react/prop-types */
import { SimpleGrid, Text } from "@chakra-ui/react";
import Link from "next/link";

import DiveTripCard from "components/card/DiveTripCard";

export default function Destinations(props) {
  const { cities, ...rest } = props;
  return (
    <>
      <Text
        mt={{ md: "0px", lg: "30px" }}
        mb="20px"
        fontSize="2xl"
        ms="24px"
        fontWeight="700"
        {...rest}
      >
        Top Destinations
      </Text>
      <SimpleGrid columns={{ base: 2, md: 3, xl: 5 }} gap="20px">
        {cities?.map((x) => {
          return (
            <Link href={`/cities/${x.slug}`} passHref>
              <a>
                <DiveTripCard
                  key={x.id}
                  diveTrip={x}
                  coverPhoto={x.cover_photo}
                  url={`/cities/${x.slug}`}
                />
              </a>
            </Link>
          );
        })}
      </SimpleGrid>
    </>
  );
}
