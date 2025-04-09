import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Table } from 'antd';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const getAppointments = async () => {
        try {
            const res = await axios.get('/api/v1/user/user-appointments', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);

    const columns = [
        {
            title:'ID',
            dataIndex:'_id',
        },
        // {
        //     title:'Name',
        //     dataIndex:'name',
        //     render: (text, record) => (
        //         <span>
        //             {record.doctorId.firstName} {record.doctorId.lastName}
        //         </span>
        //     ),
        // },
        // {
        //     title:'Phone',
        //     dataIndex:'phone',
        //     render: (text, record) => (
        //         <span>
        //             {record.doctorId.phone}
        //         </span>
        //     ),
        // },
        {
            title:'Date & Time',
            dataIndex:'date',
            render: (text, record) => (
                <span>
                        {appointments.map((appointment) => (
                            <div key={appointment._id}>
                                {appointment.date} &nbsp;
                                {appointment.time}
                            </div>
                        ))}
                </span>
            ),
        },
        {
            title:'Status',
            dataIndex:'status',
        },
    ];

  return (
    <Layout>
        <h1 align="center" className='p-2'>Appointments Lists</h1>
        <Table columns={columns} dataSource={appointments}/>

    </Layout>
  );
};

export default Appointments;