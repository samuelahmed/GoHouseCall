import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { env } from "~/env.mjs";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { useState } from "react";
import { useEffect } from "react";

interface GoogleMapsProps {
  googleAddress: string;
}

const GoogleMaps: React.FC<GoogleMapsProps> = ({ googleAddress }) => {
  //This works overall but is making WAY too many calls to the google API
  //Also unreliable when it comes to updating the address
  //Add: 'get my location' button

  const [lat, setLat] = useState(37.33548);
  const [lng, setLng] = useState(-121.893028);
  const [address, setAddress] = useState("");
  const [marker, setMarker] = useState<boolean>(false);
  const [addressLoaded, setAddressLoaded] = useState(false);

  // console.log("GOOGLE ADDRESS", googleAddress);

  useEffect(() => {
    if (googleAddress) {
      setAddress(googleAddress);
      setAddressLoaded(true);
    }
  }, [googleAddress]);

  const handleAddress = async () => {
    // if (typeof getGeocode !== 'function') {
    //   console.error('getGeocode is not defined');
    //   return;
    // }

    if (!googleAddress) {
      setAddress("san jose");
      return;
    }
    if (!address) {
      setAddress("");
      return;
    }
    if (address === undefined) {
      setAddress("");
      return;
    }
    //This is a hacky fix for the address not loading in time
    if (addressLoaded === false) {
      setAddress("");
      return;
    }
    if (address === "") {
      setAddress("san jose");
      return;
    }



    const results = await getGeocode({
      address: address,
      region: "us",
    });

    if (results && results.length > 0 && results[0]) {
      const { lat, lng } = getLatLng(results[0]);
      setLat(lat);
      setLng(lng);
    }
    setMarker(true);
    // console.log("MARKER", marker);
  };

  useEffect(() => {
    console.log("meow");
    void handleAddress();
  }, [address]);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: lat,
    lng: lng,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div className="h-full w-full ">
        {googleAddress && (
          <div className="flex flex-col items-center justify-center">
            <p className="">{address}</p>
          </div>
        )}
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
          {marker && <Marker position={center} />}
          <Marker position={center} />
        </GoogleMap>
      </div>
    </>
  );
};

export default GoogleMaps;
