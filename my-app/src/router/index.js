import React from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from '../pages/Login';
import Layout from '../pages/Layout';
import AccountManage from '../pages/AccountManage';

const BasicRoute = () => {
    const location = useLocation();
    const history = useNavigate();
    const isLogin = sessionStorage.token ? true : false;

    React.useEffect(() => {
        if(location.pathname != '/login' && isLogin === false) {
            history('/login');
        }
    },[])

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
                <Route path='AccountManage' element={<AccountManage />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default BasicRoute;