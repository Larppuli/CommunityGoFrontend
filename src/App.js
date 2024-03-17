import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import NewRideView from './components/NewRideView';
import Bundles from './components/Bundles';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/new-ride" element={<NewRideView/>} />
          <Route path="/bundles" element={<Bundles/>} />
        </Routes>
        <Navbar />
    </Router>
  );
}

export default App;