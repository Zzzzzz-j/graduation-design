import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/Login';

const BasicRoute = () => (
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
);

export default BasicRoute;