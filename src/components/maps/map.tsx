import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { env } from "~/env.mjs";
import { useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

interface GoogleMapsProps {
  googleAddress: string;
}

const GoogleMaps: React.FC<GoogleMapsProps> = ({ googleAddress }) => {
  console.log(googleAddress, " from google maps");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (isLoaded && googleAddress) {
      // Perform any action or fetch data based on the googleAddress prop
      console.log(googleAddress, " from GoogleMaps useEffect");
    }
  }, [isLoaded, googleAddress]);

  // useEffect(() => {
  //   // Perform any action or fetch data based on the googleAddress prop
  //   console.log(googleAddress, " from GoogleMaps useEffect");
  // }, [googleAddress]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      ></GoogleMap>
    </>
  );
};

export default GoogleMaps;
