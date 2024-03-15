import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const MapContainer = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Initialize the Google Maps loader with the provided API key, version and necessary libraries.
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then((google) => {
        // Create a new map instance with specified options and set it to the map container reference.
        const mapInstance = new google.maps.Map(mapContainerRef.current, {
          center: { lat: 60.4518, lng: 22.2666 }, // Coordinates for Turku
          zoom: 12,
          disableDefaultUI: true,
          });

      // The visuality of the map is defined here
      const grayscaleStyle = new google.maps.StyledMapType(
        [
          { elementType: "geometry", stylers: [{ color: "#333328" }] },
          { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#d4d4dc" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#333333" }] },
          { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
          { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#888888" }] },
          { featureType: "poi", elementType: "geometry", stylers: [{ color: "#555555" }] },
          { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#777777" }] },
          { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#444444" }] },
          { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#888888" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#666666" }] },
          { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#777777" }] },
          { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#888888" }] },
          { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#555555" }] },
          { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#999999" }] },
          { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#999999" }] },
          { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#777777" }] },
          { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#555555" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#666666" }] },
        ],
        { name: "Grayscale" }
      );

      mapInstance.mapTypes.set("styled_map", grayscaleStyle);
      mapInstance.setMapTypeId("styled_map");

    });
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{
        height: "400px",
        width: "99%",
        borderRadius: "5px",
        marginBottom: "10px",
        border: "2px solid #222222", 
      }}
    />
  );
};

export default MapContainer;