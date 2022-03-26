import React, { useState } from "react";
import { Table, Space, Button, message, Modal } from 'antd';
import { getAccountList, deleteAccount } from '../../api';
import { useSelector } from 'react-redux';
import './index.scss';

export default function AccountManage() {
    const [pageSize, setPageSize] = useState(10);
    const [pageNum, setPageNum] = useState(1);
    const [total, setTotal] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [record, setRecord] = useState({});
    const userInfo = useSelector(state => state.user_info);

    React.useEffect(() => {
        getAccountListInfo(pageNum, pageSize);
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
            title: '电话',
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
                    {
                        userInfo.user_id === record.user_id ? <Button type="link" disabled>删除</Button> 
                        : <Button onClick={() => showModal(record)} type="link" danger>删除</Button>
                    }
                </Space>
            ),
        },
    ];

    function getAccountListInfo(num, size) {
        return getAccountList({ pageNum: num, pageSize: size }).then(res => {
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
        getAccountListInfo(value, pageSize);
    }

    async function clickDeleteAccount() {
        await deleteAccount({ id: record.user_id }).then(res => {
            if (res.status === 200) {
                message.success(res.message);
            } else {
                message.error(res.message);
            }
        })
        await getAccountListInfo(pageNum, pageSize);
    }

    const showModal = (record) => {
        setRecord(record);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        clickDeleteAccount();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="account-manage">
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
        </div>
    )
}
