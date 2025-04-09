import React from 'react';
import "../styles/RegisterStyles.css";
import { Form, Input, message } from 'antd';
import {useDispatch} from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@ant-design/v5-patch-for-react-19';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    //form handler
    const onfinishHandler = async(values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/login', values);
            window.location.reload();
            dispatch(hideLoading());
            if(res.data.success){
                localStorage.setItem("token", res.data.token);
                message.success('Login Successfully');
                navigate('/');
            } else {
                alert("Wrong Email ID or Password");
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something went wrong');
        }
    };
  return (
    <div className='form-container'>
            <Form layout='vertical' onFinish={onfinishHandler} className='card2'>
                <h3 className='text-center'>Login Form</h3>
                <Form.Item label="Email" name="email">
                    <Input type="email" required />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password" required />
                </Form.Item>
                <button className='btn btn-primary' type='submit'>Login</button>
                <Link to="/register" className='text m-2'>Not a user, Register here</Link>
            </Form> 
        </div>
  );
};

export default Login;