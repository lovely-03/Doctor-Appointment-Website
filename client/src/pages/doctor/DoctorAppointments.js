import React, { useState, useEffect }  from 'react';
import Layout from '../../components/Layout';
import { message, Table } from 'antd';
import axios from 'axios';

const DoctorAppointments = () => {

    const [appointments, setAppointments] = useState([]);
    const getAppointments = async () => {
        try {
            const res = await axios.get('/api/v1/doctor//doctor-appointments', {
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

    const handleStatus = async (record, status) => {
        try {
            const res = await axios.post(
              "/api/v1/doctor/update-status",
              { appointmentsId: record._id, status },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            if (res.data.success) {
              message.success(res.data.message);
              getAppointments();
            }
          } catch (error) {
            console.log(error);
            message.error("Something Went Wrong");
          }
    };

    const columns = [
            {
                title:'ID',
                dataIndex:'_id',
            },
            {
                title:'Name',
                dataIndex:'name',
                render: (text, record) => (
                    <span>
                        {record.name}
                    </span>
                ),
            },
            {
                title:'Phone',
                dataIndex:'phone',
                render: (text, record) => (
                    <span>
                        {record.phone}
                    </span>
                ),
            },
            {
                title:'Date & Time',
                dataIndex:'date',
                render: (text, record) => (
                    <span>
                        {record.date} {record.time}
                    </span>
                ),
            },
            {
                title:'Status',
                dataIndex:'status',
            },
            {
                title:'Actions',
                dataIndex:'actions',
                render: (text, record) => (
                    <div className='d-flex'>
                        {record.status === "pending" && (
                            <div className='d-flex'>
                                <button className='btn1 btn-success' onClick={() => handleStatus(record, 'approved')}>Approve</button>
                                <button className='btn2 btn-danger ms-2' onClick={() => handleStatus(record, 'reject')}>Reject</button>
                            </div>
                        )}
                    </div>
                ),
            },
        ];

  return (
    <Layout>
        <h1 align="center" className='p-2'>Appointments Lists</h1>
        <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default DoctorAppointments;