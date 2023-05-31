import React, { Component } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { env } from "~/env.mjs";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const GoogleMaps: React.FC = () => {
  return (
    <LoadScript
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      googleMapsApiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMaps;
