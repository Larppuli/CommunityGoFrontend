import React, { useState, useEffect } from "react";
import MapContainer from "./MapContainer";

const DriversView = ({ loader }) => {
  // State to hold the route data
  const [route, setRoute] = useState(null);

  // Function to fetch route data from the database
  const fetchRouteData = async () => {
    try {
      // Perform the fetch operation
      const response = await fetch(`${process.env.REACT_APP_SERVER_URI}rides`);
      const data = await response.json();
      
      // Update the route state with the fetched data
      setRoute(data[2].routes[0].overview_polyline);
      console.log(data[0])

    } catch (error) {
      console.error("Error fetching route data:", error);
    }
  };

  // Fetch route data when the component mounts
  useEffect(() => {
    fetchRouteData();
  }, []);

  return (
    // Render MapContainer only when route data is available
    route && <MapContainer route={route} loader={loader} />
  );
};

export default DriversView;