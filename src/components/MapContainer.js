import React, { useEffect, useRef } from "react";

const MapContainer = ({ route, loader }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
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

      renderRoute(google, mapInstance, route);
    });
  }, [route, loader]);

   // Function to render route on the map
   const renderRoute = (google, map, route) => {
    // Extract route data from the provided route object

    // Decode the polyline points
    const decodedPath = google.maps.geometry.encoding.decodePath(route.points);

    // Create a Polyline object to render the route
    const routePolyline = new google.maps.Polyline({
      path: decodedPath,
      geodesic: true,
      strokeColor: "#3EF820",
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });

    // Set the Polyline on the map
    routePolyline.setMap(map);
  };

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