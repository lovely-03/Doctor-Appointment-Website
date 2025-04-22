import React from 'react';
import "../styles/RegisterStyles.css";
import { Form, Input, message} from 'antd';
import axios from 'axios'
import {Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import '@ant-design/v5-patch-for-react-19';
const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //form handler
    const onfinishHandler = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/register', values);
            dispatch(hideLoading());
            if(res.data.success){
                message.success('Register Successfully!');
                navigate('/login');
            } else{
                message.error("Wrong Email ID or Password");
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something Went Wrong');
        }
    };
  return (
    <>
        <div className='form-container'>
            <Form layout='vertical' onFinish={onfinishHandler} className='card2'>
                <h3 className='text-center'>Register Form</h3>
                <Form.Item label="Name" name="name" rules={[
                    { required: true, message: "Please enter your name" },
                    { min: 3, message: "Name must be at least 3 characters long" }]}>
                    <Input type="text" required />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email address" }]}>
                    <Input type="email" required />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[
                    { required: true, message: "Please enter your password" },
                    { min: 5, message: "Password must be at least 5 characters long" },
                    {
                        pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                        message: "Password must include uppercase, number, and special character"
                    }]}>
                    <Input type="password" required />
                </Form.Item>
                
                <button className='btn btn-primary' type='submit'>Register</button>
                <Link to="/login" className='m-2'>Already a user, login here</Link>
            </Form> 
        </div>
    </>
  );
};

export default Register;