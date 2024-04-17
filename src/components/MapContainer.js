import React, { useEffect, useRef } from "react";

const MapContainer = ({ polyline, ride, loader, height }) => {
  const mapContainerRef = useRef(null);
  
  useEffect(() => {
    const loadMap = async () => {
      const google = await loader.load();
      const { PinElement } = await google.maps.importLibrary(
        "marker",
      );

      const mapInstance = new google.maps.Map(mapContainerRef.current, {
        center: { lat: 60.4518, lng: 22.2666 },
        zoom: 12,
        disableDefaultUI: true,
        mapId: "DEMO_MAP_ID"
      });
      
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

      renderRoute(google, mapInstance, polyline);

      const pinGreen = new PinElement({
        background: 'green',
        borderColor: 'green',
        glyphColor: "#005610",
      });
      
      // Add marker for destination if found
      if (ride && ride.destination && ride.destination.geometry && ride.destination.geometry.location) {
        new google.maps.marker.AdvancedMarkerElement({
          position: ride.destination.geometry.location,
          map: mapInstance,
          title: ride.destination.name,
          content: pinGreen.element
        });
      }

      // Add marker for pickup if found
      if (ride && ride.pickup && ride.pickup.geometry && ride.pickup.geometry.location) {
        new google.maps.marker.AdvancedMarkerElement({
          position: ride.pickup.geometry.location,
          map: mapInstance,
          title: ride.pickup.name,
        });
      }

      // Add markers for waypoints if found
      if (ride && ride.waypoints && Array.isArray(ride.waypoints)) {
        ride.waypoints.forEach((waypoint, index) => {
          if (waypoint && waypoint.geometry && waypoint.geometry.location) {
            new google.maps.marker.AdvancedMarkerElement({
              position: waypoint.geometry.location,
              map: mapInstance,
              title: waypoint.name,
            });
          }
        });
      }
    };

    loadMap();
  }, [polyline, loader, ride]);

  const renderRoute = (google, map, polyline) => {
    if (!polyline || !polyline.points) {
      console.error("Polyline data is empty or invalid");
      return;
    }

    const decodedPath = google.maps.geometry.encoding.decodePath(polyline.points);

    const routePolyline = new google.maps.Polyline({
      path: decodedPath,
      strokeColor: "#5662FF",
      strokeWeight: 4,
    });

    routePolyline.setMap(map);
  };

  return (
    <div
      ref={mapContainerRef}
      style={{
        height: height,
        width: "99%",
        borderRadius: "5px",
        marginBottom: "10px",
        border: "2px solid #222222",
      }}
    />
  );
};

export default MapContainer;