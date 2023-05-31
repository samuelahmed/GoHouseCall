import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, PromiseLikeOfReactNode } from "react";
import { env } from "~/env.mjs";


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
    
export default function TestLoadScript( children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | PromiseLikeOfReactNode | null | undefined ) {
  return (
    <>
      <LoadScriptOnlyIfNeeded
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        googleMapsApiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      />
    </>
  );
}
