import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import NewRideView from './components/NewRideView';
import PassengerBundles from './components/PassengerBundles';
import DriverBundles from './components/DriverBundles';
import { Loader } from '@googlemaps/js-api-loader';

function App() {

  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    version: "weekly",
    libraries: ["places", "geometry"],
  });

  return (
    <Router>
        <Routes>
          <Route path="/new-ride" element={<NewRideView loader={loader} />} />
          <Route path="/passenger-bundles" element={<PassengerBundles loader={loader} />} />
          <Route path="/driver-bundles" element={<DriverBundles loader={loader} />} />
        </Routes>
        <Navbar />
    </Router>
  );
}

export default App;