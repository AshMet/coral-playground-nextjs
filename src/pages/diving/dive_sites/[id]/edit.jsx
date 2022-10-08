/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
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
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// Assets
// import banner from "assets/img/auth/banner.png";
// import profile from "assets/img/crm/vbz.png";
// import axios from "axios";
// import React from "react";
// // Custom components
// import Info from "views/admin/main/profile/settings/components/Info";
// import Password from "views/admin/main/profile/settings/components/Password";
// import Profile from "views/admin/main/profile/settings/components/Profile";
// import Socials from "views/admin/main/profile/settings/components/Socials";

export default function Settings() {
  const [diveMap, setDiveMap] = useState(null);
  const [setDiveMapUrl] = useState(null);
  const [diveSite, setDiveSite] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetch(`https://coral-playground-api.herokuapp.com/api/v1/dive_sites/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setDiveSite(data);
        setDiveMapUrl(data.dive_map_s3);
        console.log("inside", data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    setDiveMapUrl(diveSite?.dive_map);
  }, [diveSite]);

  function submitToApi(data) {
    fetch(
      `https://coral-playground-api.herokuapp.com/api/v1/dive_sites/${id}`,
      {
        method: "PATCH",
        body: data,
      }
    )
      .then((response) => response.json())
      // .then((data) => console.log("response", data))
      // .then((response) => setDiveSite(response.json()))
      .then((data) => {
        setDiveSite(data);
        setDiveMapUrl(data.dive_map_s3);
      })
      .catch((error) => console.error(error));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("dive_site[dive_map]", diveMap);
    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }
    // console.log("diveMap", diveMap);
    // console.log("event", event.target.dive_map.files[0]);
    submitToApi(formData);
  }

  console.log("outside", diveMap);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, lg: 2 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        {/* Column Left */}
        <Flex direction="column">
          {/* <Profile name='Vlad Mihalache' avatar={profile} banner={banner} />
          <Info /> */}
          <Text> {diveSite?.name} </Text>
          <Text> {diveSite?.dive_map} </Text>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="file"
              name="dive_map"
              id="dive_map"
              onChange={(e) => setDiveMap(e.target.files[0])}
            />
            <button type="submit"> Upload </button>
          </form>
        </Flex>
        {/* Column Right */}
        <Flex direction="column">
          {/* <Socials />
          <Password /> */}
          {diveSite?.dive_map && (
            <Image src={diveSite?.dive_map} width="800px" height="600px" />
          )}
        </Flex>
      </SimpleGrid>
    </Box>
  );
}
