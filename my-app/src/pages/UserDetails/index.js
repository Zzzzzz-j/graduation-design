import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Image } from 'antd';
import { getUserDetails } from '../../api';
import './index.scss';

export default function UserDetails() {
    const [data, setData] = useState({});

    const history = useNavigate();
    const location = useLocation();
    const { state } = location;

    React.useEffect(() => {
        console.log(state);
        if (state === null) {
            history('/UserManage');
        } else {
            getUserDetails({ id: state.id }).then(res => {
                if (res.status === 200) {
                    setData(res.data);
                }
            })
        }
    }, [])

    return (
        <div className="user-details">
            <div className="item">
                <span className="title">姓名:</span>
                <span className="text">{data.name ? data.name : '暂无数据'}</span>
            </div>
            <div className="item">
                <span className="title">年龄:</span>
                <span className="text">{data.age ? data.age : '暂无数据'}</span>
            </div>
            <div className="item">
                <span className="title">性别:</span>
                <span className="text">{data.gender ? data.gender : '暂无数据'}</span>
            </div>
            <div className="item">
                <span className="title">电话号:</span>
                <span className="text">{data.phone ? data.phone : '暂无数据'}</span>
            </div>
            <div className="item">
                <span className="title">身份证号:</span>
                <span className="text">{data.id_number ? data.id_number : '暂无数据'}</span>
            </div>
            <div className="item">
                <span className="title">银行卡号:</span>
                <span className="text">{data.bank_card ? data.bank_card : '暂无数据'}</span>
            </div>
            <div className="item">
                <span className="title">家庭住址:</span>
                <span className="text">{data.address ? data.address : '暂无数据'}</span>
            </div>
            <div className="item">
                <span className="title">身份证正面照:</span>
                {
                    data.id_card_front ? <Image width={300} height={180} src={data.id_card_front} /> : <span className="text">暂无数据</span>
                }
            </div>
            <div className="item">
                <span className="title">身份证背面照:</span>
                {
                    data.id_card_reverse ? <Image width={300} height={180} src={data.id_card_reverse} /> : <span className="text">暂无数据</span>
                }
            </div>
        </div>
    )
}