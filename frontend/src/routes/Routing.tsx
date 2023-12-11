import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from '@/pages/Auth/Login';
import { Register } from '@/pages/Auth/Register';
import { Songs } from '@/pages/Songs';

const Routing = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Songs />} />
    </Routes>
  );
};

export default Routing;
