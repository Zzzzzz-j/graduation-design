import React, { useState } from "react";
import { Layout, Menu, Dropdown, Modal, Button, Form, Input, message } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import logoImg from '../../public/logo.png';
import { getUserInfo, changePassword } from '../../api';
import { USERINFO } from '../../redux/action-types';
import { DownOutlined } from '@ant-design/icons';
import './index.scss';

const { Header, Sider, Content } = Layout;

export default function AccountManage(props) {
    const [visible, setVisible] = useState(false);
    const [state, setState] = useState('/LoanApproval');

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user_info);
    const [form] = Form.useForm();

    const history = useNavigate();
    const location = useLocation();
    const menu = (
        <Menu>
            <Menu.Item key="0">
                <div onClick={logOut}>退出登录</div>
            </Menu.Item>
            <Menu.Item key="1">
                <div onClick={showModal}>修改密码</div>
            </Menu.Item>
        </Menu>
    );

    React.useEffect(() => {
        getUserInfo().then(res => {
            dispatch({ type: USERINFO, data: res });
        })
    }, [])

    function logOut() {
        console.log('logout');
        sessionStorage.removeItem('token');
        history('/login');
    }

    function showModal() {
        form.resetFields();
        setVisible(true);
    };

    function handleCancel() {
        setVisible(false);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        const { newPassword } = values;
        changePassword({ password: newPassword, id: userInfo.user_id }).then(res => {
            console.log(res);
            if (res.status === 200) {
                message.success('修改成功!');
                userInfo.password = newPassword;
                dispatch({ type: USERINFO, data: userInfo });
            } else {
                message.error(res.message);
            }
        })
        setVisible(false);
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const menuChange = (key) => {
        if (key === state) return;
        switch (key) {
            case '/LoanApproval':
                setState('/LoanApproval')
                history('/LoanApproval')
                break;
            case '/UserManage':
                setState('/UserManage')
                history('/UserManage')
                break;
            case '/AccountManage':
                setState('/AccountManage')
                history('/AccountManage')
                break;
        }
    }

    return (
        <>
            <Layout className="layout-contaniner">
                <Sider className="sider" trigger={null} >
                    <div className="logo">
                        <img className="logo-img" src={logoImg} alt="" />
                    </div>
                    <Menu className="menu" theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
                        <Menu.Item className="menu-item" key="/LoanApproval" onClick={() => {menuChange('/LoanApproval')}} icon={<UserOutlined />}>
                            贷款审批
                        </Menu.Item>
                        <Menu.Item className="menu-item" key="/UserManage" onClick={() => {menuChange('/UserManage')}} icon={<VideoCameraOutlined />}>
                            用户管理
                        </Menu.Item>
                        <Menu.Item className="menu-item" key="/AccountManage" onClick={() => {menuChange('/AccountManage')}} icon={<UploadOutlined />}>
                            账号管理
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: '0 20px' }}>
                        <div className="layout-title">小额贷款管理后台</div>
                        <div className="layout-user">
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    {userInfo.username} <DownOutlined />
                                </a>
                            </Dropdown></div>
                    </Header>
                    <Content
                        className="site-layout-background-content"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
            <Modal
                title="修改密码"
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <Form
                    name="basic"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item
                        label="旧密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                min: 6,
                                max: 16,
                                message: '请输入6-16位的密码!',
                            },
                            {
                                pattern: /^[^\s]*$/,
                                message: '密码不允许出现空格!'
                            },
                            () => ({
                                validator(_, value) {
                                    if (!value || userInfo.password === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('您输入的旧密码不正确!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="请输入旧密码" />
                    </Form.Item>
                    <Form.Item
                        label="新密码"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                min: 6,
                                max: 16,
                                message: '请输入6-16位的密码!',
                            },
                            {
                                pattern: /^[^\s]*$/,
                                message: '密码不允许出现空格!'
                            }
                        ]}
                    >
                        <Input.Password placeholder="请输入新密码" />
                    </Form.Item>
                    <Form.Item
                        label="确认新密码"
                        name="confirmNewPassword"
                        dependencies={['newPassword']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                min: 6,
                                max: 16,
                                message: '请输入6-16位的密码!',
                            },
                            {
                                pattern: /^[^\s]*$/,
                                message: '密码不允许出现空格!'
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('您输入的两个密码不匹配!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="请再次输入新密码" />
                    </Form.Item>
                    <Form.Item>
                        <div className="changepwd-footer">
                            <Button type="primary" style={{ marginRight: '45px' }} size='large' className='btn' htmlType="submit">
                                确认
                            </Button>
                            <Button type="primary" size='large' className='btn' onClick={handleCancel}>
                                取消
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
