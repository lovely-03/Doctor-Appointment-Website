import React from 'react';
import Layout from "./../components/Layout";
import { Col, Form, Input, Row, message } from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import "../styles/ApplyDoctor.css";
//import moment from 'moment';

const ApplyDoctor = () => {
    const {user} = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    //handle form
    const handleFinish = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/apply-doctor', {...values, userId:user._id,
                // timings: [
                //     moment(values.timings[0]).format('HH:mm'),
                //     moment(values.timings[1]).format('HH:mm'),
                // ],
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(hideLoading());
            if(res.data.success){
                message.success(res.data.message);
                navigate('/');
            } else {
                message.error(res.data.success);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);;
            message.error('Something went wrong');
        }
    };

  return (
    <Layout>
        <h1 className='text-center1'>Apply For Doctor Account</h1>
        <Form layout='vertical' onFinish={handleFinish} className='m-3'>
            <h3 className=''>Personal Details: </h3>
            <Row gutter={20}>      
                <Col xs={24} md={24} lg={8} >
                <b><Form.Item label="First Name" name="firstName" required rules={[{ required: true }]}>
                    <Input type="text" placeholder="your name" className='input' />
                </Form.Item></b>
                </Col>
                <Col xs={24} md={24} lg={8}>
                <b><Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]}>
                    <Input type="text" placeholder="your last name" className='input' />
                </Form.Item></b>
                </Col>
                <Col xs={24} md={24} lg={8}>
               <b><Form.Item label="Phone No" name="phone" required rules={[{ required: true }]}>
                    <Input type="text" placeholder="your contact no" className='input' />
                </Form.Item></b>
                </Col>
                <Col xs={24} md={24} lg={8}>
                <b><Form.Item label="Email" name="email" required rules={[{ required: true }]}>
                    <Input type="email" placeholder="your email address" className='input' />
                </Form.Item></b>
                </Col>
                <Col xs={24} md={24} lg={8}>
                <b><Form.Item label="Website" name="website" required rules={[{ required: true }]}>
                    <Input type="text" placeholder="your website"  className='input'/>
                </Form.Item></b>
                </Col>
                <Col xs={24} md={24} lg={8}>
                <b><Form.Item label="Address" name="address" required rules={[{ required: true }]}>
                    <Input type="text" placeholder="your clinic address" className='input' />
                </Form.Item></b>
                </Col>
            </Row>
         

            <h3 className=''>Professional Details: </h3>
            <Row gutter={20}>
                
                <Col xs={24} md={24} lg={8}>
                <b><Form.Item label="Specialization" name="specialization" required rules={[{ required: true }]}>
                    <Input type="text" placeholder="your specialization" className='input' />
                </Form.Item></b>
                </Col>
                <Col xs={24} md={24} lg={8}>
                <b><Form.Item label="Experience" name="experience" required rules={[{ required: true }]}>
                    <Input type="text" placeholder="your experience"  className='input'/>
                </Form.Item></b>
                </Col>
                <Col xs={24} md={24} lg={8}>
                <b><Form.Item label="Fees Per Consultation" name="feesPerConsultation" required rules={[{ required: true }]}>
                    <Input type="text" placeholder="your fees"  className='input'/>
                </Form.Item></b>
                </Col>
                {/* <Col xs={24} md={24} lg={8}>
                <Form.Item label="Timings" name="timings" required >
                    <TimePicker.RangePicker format="HH:mm" />
                </Form.Item>
                </Col> */}
                <Col xs={24} md={24} lg={8}></Col>
                <Col xs={24} md={24} lg={8}>
                    <button className='btn btn-primary form-btn' type='submit'>Submit</button>
                </Col>
            </Row>
        </Form>
    </Layout>
  );
};

export default ApplyDoctor;

