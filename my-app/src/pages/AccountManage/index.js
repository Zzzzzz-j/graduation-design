import React, { useState } from "react";
import { Table, Tag, Space } from 'antd';
import { getAccountList } from '../../api';

export default function AccountManage() {
    const [pageSize, setPageSize] = useState(10);
    const [pageNum, setPageNum] = useState(1);
    const [total, setTotal] = useState(0);

    React.useEffect(() => {
        console.log(transformTimestamp("2022-03-07T06:58:15.000Z"));
        getAccountList({pageNum: pageNum, pageSize: pageSize}).then(res => {
            console.log(res);

        })
    },[])

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text,record,index) => `${(pageNum - 1) * 10 + (index + 1)}`,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    function transformTimestamp(timestamp){
        let a = new Date(timestamp).getTime();
        const date = new Date(a);
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + '  ';
        const h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
        const m = (date.getMinutes() <10 ? '0'+date.getMinutes() : date.getMinutes()) ;
        // const s = date.getSeconds(); // 秒
        const dateString = Y + M + D + h + m;
        // console.log('dateString', dateString); // > dateString 2021-07-06 14:23
        return dateString;
    }

    return (
        <div className="account-manage">
            <Table columns={columns} dataSource={data} />
        </div>
    )
}
