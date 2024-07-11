import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/MainPage/HomePage';
import SupplierPage from './components/MainPage/pages/SupplierPage/SupplierPage';
import BuyerRegistration from './components/MainPage/pages/BuyerRegistration/BuyerRegistration';
import EnterPage from './components/MainPage/pages/LoginPage/LoginPage';
import LoginPage from './components/MainPage/pages/LoginPage/LoginPage';
import BuyerPage from './components/MainPage/pages/BuyerPage/BuyerPage';
import SupplierProfile from './components/MainPage/pages/SupplierProfile/SupplierProfile';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/supplier" element={<SupplierPage />} />
      <Route path="/buyer" element={<BuyerRegistration />} />
      <Route path="/enter" element={<LoginPage />} />
      <Route path="/buyer/:id" element={<BuyerPage />} />
      <Route path="/supplier-profile/:id" element={<SupplierProfile />} />


    </Routes>
  </Router>
);

export default App;
