import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { env } from "~/env.mjs";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { useState } from "react";
import { Button } from "../ui/button";
import { useEffect } from "react";

interface GoogleMapsProps {
  googleAddress: string;
}
interface LatLng {
  lat: number;
  lng: number;
}

const GoogleMaps: React.FC<GoogleMapsProps> = ({ googleAddress }) => {
  const [lat, setLat] = useState(37.33548);
  const [lng, setLng] = useState(-121.893028);
  const [address, setAddress] = useState("");
  const [selected, setSelected] = useState<LatLng | null>(null);

  useEffect(() => {
    if (googleAddress) {
      setAddress(googleAddress);
    }
  }, [googleAddress]);

  const handleAddress = async () => {
    if (!address) {
      return;
    }
    if (address === undefined) {
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
    setSelected({ lat, lng });
  };

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
          {selected && <Marker position={selected} />}

          <Marker position={center} />
        </GoogleMap>
        <Button
          variant="outline"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleAddress}
        >
          Update Address
        </Button>
      </div>
    </>
  );
};

export default GoogleMaps;
