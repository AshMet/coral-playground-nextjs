/* eslint-disable react/prop-types */
import { Avatar, Tag, TagLabel } from "@chakra-ui/react";
import { Marker } from "react-map-gl";

import DiveSiteCard from "components/card/DiveSiteCard";

export default function MapMarker({
  location,
  mapLocation,
  setMapLocation,
  type,
  mapRef,
}) {
  return (
    <Marker
      key={location.latitude + location.longitude}
      latitude={location.latitude}
      longitude={location.longitude}
      anchor="bottom"
      onClick={(e) => {
        // If we let the click event propagates to the map, it will immediately close the popup
        // with `closeOnClick: true`
        e.originalEvent.stopPropagation();
        setMapLocation(location);
        mapRef.current?.flyTo({
          center: [location.longitude, location.latitude + 0.02],
          zoom: 13,
          duration: 2000,
        });
      }}
    >
      {location.latitude !== mapLocation.latitude ? (
        <Tag size="sm" bgColor="#0b050575" color="white" borderRadius="full">
          <Avatar
            src={
              type === "diveSite"
                ? "/img/diving/dive_site_icon.svg"
                : "/img/diving/dive_centre_icon.svg"
            }
            size={location.latitude === mapLocation.latitude ? "sm" : "xs"}
            // name={location.name}
            ml={-1}
            mr={2}
          />
          <TagLabel>{location.name}</TagLabel>
        </Tag>
      ) : (
        <DiveSiteCard
          key={location.id}
          id={location.id}
          name={location.name}
          tagList={location.tags}
          type={type}
          image={
            type === "diveSite" ? location.diveMap : location.coverPhotoUrl
          }
          zIndex={3}
        />
      )}
    </Marker>
  );
}
