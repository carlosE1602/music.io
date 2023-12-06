import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from '@/pages/Auth/Login';
import { Register } from '@/pages/Auth/Register';

const Routing = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Routing;
