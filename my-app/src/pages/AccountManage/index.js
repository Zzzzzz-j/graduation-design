import React, { useState } from "react";
import { Table, Space, Button, message, Modal, Input, Form } from 'antd';
import { getAccountList, deleteAccount, updateAccount } from '../../api';
import { useSelector } from 'react-redux';
import './index.scss';

const { Search } = Input;

export default function AccountManage() {
    const [form] = Form.useForm();
    const [pageSize, setPageSize] = useState(10);
    const [pageNum, setPageNum] = useState(1);
    const [total, setTotal] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [record, setRecord] = useState({});
    const [search, setSearch] = useState('');
    const [compileInfo, setCompileInfo] = useState(null);
    const userInfo = useSelector(state => state.user_info);

    React.useEffect(() => {
        getAccountListInfo(pageNum, pageSize, search);
    }, [])

    const paginationProps = {
        pageSize: pageSize,
        current: pageNum,
        total: total,
        position: ['bottomCenter'],
        onChange: (current) => changePage(current),
    };

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => `${(pageNum - 1) * 10 + (index + 1)}`,
        },
        {
            title: '名称',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '创建日期',
            dataIndex: 'created_date',
            key: 'created_date',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => showCompileModel(record)} type="link">编辑</Button>
                    {
                        userInfo.user_id === record.user_id ? <Button type="link" disabled>删除</Button>
                            : <Button onClick={() => showModal(record)} type="link" danger>删除</Button>
                    }
                </Space>
            ),
        },
    ];

    function getAccountListInfo(num, size, input) {
        return getAccountList({ pageNum: num, pageSize: size, search: input }).then(res => {
            console.log(res);
            if (res.status === 200) {
                const data = formattingData(res.data);
                setTableData(data);
                setTotal(res.total);
            }

        })
    }

    function formattingData(data) {
        const arr = data.map(item => {
            item.created_date = transformTimestamp(item.created_date);
            return item
        })
        return arr;
    }

    function transformTimestamp(timestamp) {
        let a = new Date(timestamp).getTime();
        const date = new Date(a);
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '  ';
        const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        // const s = date.getSeconds(); // 秒
        const dateString = Y + M + D + h + m;
        // console.log('dateString', dateString); // > dateString 2021-07-06 14:23
        return dateString;
    }

    function changePage(value) {
        setPageNum(value);
        getAccountListInfo(value, pageSize, search);
    }

    async function clickDeleteAccount() {
        await deleteAccount({ id: record.user_id }).then(res => {
            if (res.status === 200) {
                message.success(res.message);
            } else {
                message.error(res.message);
            }
        })
        await getAccountListInfo(pageNum, pageSize, search);
    }

    const showModal = (record) => {
        setRecord(record);
        setIsModalVisible(true);
    };

    const showCompileModel = (record) => {
        setCompileInfo(record);
        form.setFieldsValue(record);
        setVisible(true);
    }

    const handleOk = () => {
        clickDeleteAccount();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onSearch = (value) => {
        setSearch(value);
        getAccountListInfo(pageNum, pageSize, value);
    }

    const onFinish = async (values) => {
        const { username } = values;
        await updateAccount({ username: username, id: compileInfo.user_id }).then((res) => {
            if (res.status === 200) {
                message.success('修改成功!');
            } else {
                message.error(res.message);
            }
        })
        await getAccountListInfo(pageNum, pageSize, search);
        setVisible(false);
        form.resetFields();
        setCompileInfo(null);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        form.resetFields();
        setCompileInfo(null);
    };

    function handleProfileCancel() {
        setVisible(false);
    };

    return (
        <div className="account-manage">
            <Search
                placeholder="输入名称进行查询"
                allowClear
                enterButton="查询"
                size="large"
                className="account-search"
                onSearch={onSearch}
            />
            <Table columns={columns} dataSource={tableData} pagination={paginationProps} rowKey={(record) => record.user_id} />
            <Modal
                title="删除账号"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="确认"
                cancelText="取消"
            >
                <p>您确认要删除该账号吗?</p>
            </Modal>
            <Modal
                title="编辑账号信息"
                centered={true}
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
                        name="username"
                        label="名称"
                        style={{ textAlign: 'start' }}
                        rules={[
                            {
                                required: true,
                                message: '请输入名称'
                            },
                        ]}
                    >
                        <Input className="input" maxLength={10} placeholder='请输入名称' />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="手机号"
                        style={{ textAlign: 'start' }}
                    >
                        <Input className="input" placeholder='请输入手机号' disabled/>
                    </Form.Item>
                    <Form.Item>
                        <div className="changepwd-footer">
                            <Button type="primary" style={{ marginRight: '45px' }} size='large' className='btn' htmlType="submit">
                                提交
                            </Button>
                            <Button type="primary" size='large' className='btn' onClick={handleProfileCancel}>
                                取消
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
