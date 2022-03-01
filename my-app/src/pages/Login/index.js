import React from 'react';
import { testApi, registerAccount } from '../../api/index';
import axios from 'axios';


const Login = () => {
    React.useEffect(() => {
        // console.log('11111111');
        testApi({a: '11111'}).then(res => {
            console.log(res,'3333333333333');
        })
        registerAccount({username: 'zhujie', phone: 18863324705, password: 123456}).then(res => {
            console.log(res,'222222222');
        })
        // axios.get('http://localhost:5000/api/users/test?id=111111').then(res => {
        //     console.log(res,'res');
        // })
    },[])

    return (
        <div>
            Hello World!
        </div>
    )
}

export default Login;