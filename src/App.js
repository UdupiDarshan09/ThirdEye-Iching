// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlashPage from  './FlashPage'
import LandingPage from './LandingPage';
import QueryPage from './QueryPage';
import CoinToss from './CoinToss';
import Hexagram from'./Hexagram';
import HexDetails from './HexDetails';
import Report from './Report';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<FlashPage />} />
        <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/querypage" element={<QueryPage />} />
          <Route path="/cointoss" element={<CoinToss />} />
          <Route path="/hexagram" element={<Hexagram />} />
          <Route path="/hexdetails" element={<HexDetails />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
