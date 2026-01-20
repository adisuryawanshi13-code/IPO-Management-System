// import { useState } from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import LoginPage from './pages/LoginPage';
// import HomePage from './pages/HomePage';

// import IPODashboard from './pages/IPODashboard'; 
// import LiveIPO from './pages/LiveIPO';

// function App() {
//   // For now, show the IPO Dashboard directly.
//   // Later you can use login logic to toggle between pages.
//   const [page, setPage] = useState('dashboard'); 

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/mainpage" element={<HomePage />} />
//         <Route path="/ipo" element={<LiveIPO />} />
//         <Route path="/dashboard" element={<IPODashboard />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import IPODashboard from "./pages/IPODashboard";
import LiveIPO from "./pages/LiveIPO";

import "./Style/IPODashboard.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<IPODashboard />} />
        <Route path="/live" element={<LiveIPO />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;


