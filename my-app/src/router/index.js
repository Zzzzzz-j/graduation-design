import React from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from '../pages/Login';
import Layout from '../pages/Layout';
import AccountManage from '../pages/AccountManage';
import UserManage from '../pages/UserManage';
import LoanApproval from '../pages/LoanApproval';
import UserDetails from '../pages/UserDetails';

const BasicRoute = () => {
    const location = useLocation();
    const history = useNavigate();

    React.useEffect(() => {
        const isLogin = sessionStorage.token ? true : false;
        if (location.pathname != '/login' && isLogin === false) {
            console.log('/login11111');
            history('/login');
        }
    }, [])

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
                <Route path='LoanApproval/0' element={<LoanApproval />} />
                <Route path='LoanApproval/1' element={<LoanApproval />} />
                <Route path='LoanApproval/2' element={<LoanApproval />} />
                <Route path='UserManage' element={<UserManage />} />
                <Route path='UserManage/UserDetails' element={<UserDetails />} />
                <Route path='AccountManage' element={<AccountManage />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default BasicRoute;