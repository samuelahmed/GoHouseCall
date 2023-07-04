/* eslint-disable @typescript-eslint/no-misused-promises */
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { env } from "~/env.mjs";
import { use, useEffect } from "react";
//import places library
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { useState } from "react";
import { Button } from "../ui/button";
interface GoogleMapsProps {
  googleAddress: string;
}

const GoogleMaps: React.FC<GoogleMapsProps> = ({ googleAddress }) => {
  const [lat, setLat] = useState(37.33548);
  const [lng, setLng] = useState(-121.893028);

  const handleAddress = async () => {
    if (!googleAddress) return;

    const results = await getGeocode({ address: googleAddress });

    if (results && results.length > 0 && results[0]) {
      const { lat, lng } = getLatLng(results[0]);
      setLat(lat);
      setLng(lng);
    }
  };

  const containerStyle = {
    width: "100%",
    height: "100%",
  };
  // 37.3189069 -121.9932247
  const center = {
    lat: lat,
    lng: lng,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    // libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div className="h-full w-full ">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        ></GoogleMap>
        <Button variant="outline" onClick={handleAddress}>
          Update Address
        </Button>
      </div>
    </>
  );
};

export default GoogleMaps;
