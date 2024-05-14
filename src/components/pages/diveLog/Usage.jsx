/* eslint-disable react/prop-types */

import { SimpleGrid, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

import Card from "components/card/Card";
import RangeCircle from "components/pages/diveLog/RangeCircle";

export default function Usage({ diveLog }) {
  const duration = dayjs(diveLog.timeOut).diff(dayjs(diveLog.timeIn), "minute");
  const pressureDiff = diveLog.pressureIn - diveLog.pressureOut;
  return (
    <Card p="30px">
      <Text
        fontSize="lg"
        lineHeight="100%"
        // color={textColor}
        fontWeight="bold"
      >
        Usage
      </Text>
      <SimpleGrid mt="20px" columns={{ sm: 1, md: 2 }} gap="40px" mb="20px">
        <RangeCircle
          title="Duration"
          value={duration}
          unit="mins"
          percentage={(duration * 100) / 80}
          subtitle1="In"
          subtitle2="Out"
          value1={dayjs(diveLog.timeIn).tz("Africa/Cairo").format("HH:mm")}
          value2={dayjs(diveLog.timeOut).tz("Africa/Cairo").format("HH:mm")}
        />
        <RangeCircle
          title="Tank Pressure"
          value={pressureDiff}
          unit="bar"
          percentage={pressureDiff / 2}
          subtitle1="In"
          subtitle2="Out"
          value1={diveLog.pressureIn}
          value2={diveLog.pressureOut}
        />
      </SimpleGrid>
    </Card>
  );
}
