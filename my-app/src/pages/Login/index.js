import React from 'react';
import { testApi, registerAccount } from '../../api/index';
import { Button } from 'antd';
import './index.scss';


const Login = () => {
    React.useEffect(() => {
        testApi({a: '11111'}).then(res => {
            console.log(res,'3333333333333');
        })
        registerAccount({username: 'zhujie', phone: 18863324705, password: 123456}).then(res => {
            console.log(res,'222222222');
        })
    },[])

    return (
        <div className='login'>
            Hello World!
            <div className='login-main'>
                <Button>按钮</Button>
            </div>
        </div>
    )
}

export default Login;