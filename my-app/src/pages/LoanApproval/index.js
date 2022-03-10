import React, { useState } from "react";
import { Table, Space, Button, message } from 'antd';
import { useLocation } from 'react-router-dom';
import { getApplicationtList } from '../../api';

export default function LoanApproval() {
    const [pageSize, setPageSize] = useState(10);
    const [pageNum, setPageNum] = useState(1);
    const [total, setTotal] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [record, setRecord] = useState({});
    const [approve, setApprove] = useState(0);

    const location = useLocation();

    React.useEffect(() => {
        const state = setPageState();
        setPageNum(1);
        setTotal(0);
        getApplicationtListInfo(1,pageSize,state);
    }, [location.pathname])

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
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '贷款金额',
            dataIndex: 'money',
            key: 'money',
        },
        {
            title: '申请时间',
            dataIndex: 'apply_time',
            key: 'apply_time',
        },
        {
            title: '贷款开始时间',
            dataIndex: 'start_time',
            key: 'start_time',
        },
        {
            title: '贷款结束时间',
            dataIndex: 'end_time',
            key: 'end_time',
        },
        {
            title: '贷款时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link">审批</Button>
                </Space>
            ),
        },
    ];

    function setPageState() {
        let state = 0;
        switch(location.pathname) {
            case '/LoanApproval/0':
                setApprove(0)
                state = 0
                break;
            case '/LoanApproval/1':
                setApprove(1)
                state = 1
                break;
            case '/LoanApproval/2':
                setApprove(2)
                state = 2
                break
        }
        return state
    }

    function getApplicationtListInfo(num, size, approve) {
        return getApplicationtList({ pageNum: num, pageSize: size, approve: approve }).then(res => {
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
            item.apply_time = transformTimestamp(item.apply_time);
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
        getApplicationtListInfo(value,pageSize,approve);
    }

    return (
        <div className="loan-approval">
            <Table columns={columns} dataSource={tableData} pagination={paginationProps} rowKey={(record) => record.user_id} />
        </div>
    )
}