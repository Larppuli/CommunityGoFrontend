import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import NewRideView from './components/NewRideView';
import Bundles from './components/Bundles';
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
          <Route path="/bundles" element={<Bundles loader={loader} />} />
        </Routes>
        <Navbar />
    </Router>
  );
}

export default App;