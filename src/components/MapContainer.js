import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const MapContainer = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [google, setGoogle] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
      version: "weekly",
      libraries: ["places"]
    });

    loader.load().then((google) => {
      setGoogle(google);
      const mapInstance = new google.maps.Map(mapContainerRef.current, {
        center: { lat: 60.4518, lng: 22.2666 }, // Coordinates for Turku
        zoom: 8
      });
      setMap(mapInstance);
    });
  }, []);

  return (
    <div ref={mapContainerRef} style={{ height: "400px", width: "100%" }} />
  );
};

export default MapContainer;