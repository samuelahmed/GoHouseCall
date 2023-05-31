// import React, { Component } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import TestLoadScript from "./loadScript";
import { env } from "~/env.mjs";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};



//manage error caused by LoadScript without... 
class LoadScriptOnlyIfNeeded extends LoadScript {
  componentDidMount() {
    const cleaningUp = true;
    const isBrowser = typeof document !== "undefined"; // require('@react-google-maps/api/src/utils/isbrowser')
    const isAlreadyLoaded =
      window.google &&
      window.google.maps &&
      document.querySelector("body.first-hit-completed"); // AJAX page loading system is adding this class the first time the app is loaded
    if (!isAlreadyLoaded && isBrowser) {
      if (window.google && !cleaningUp) {
        console.error("google api is already presented");
        return;
      }

      void this.isCleaningUp().then(this.injectScript);
    }

    if (isAlreadyLoaded) {
      this.setState({ loaded: true });
    }
  }
}

const GoogleMaps: React.FC = () => {
  return (
    <>
      <LoadScriptOnlyIfNeeded
        googleMapsApiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        ></GoogleMap>
      </LoadScriptOnlyIfNeeded>
    </>
  );
};

export default GoogleMaps;
