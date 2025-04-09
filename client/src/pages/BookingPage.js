import React, {useState, useEffect} from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
//import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {showLoading, hideLoading} from '../redux/features/alertSlice';

const BookingPage = () => {
    const {user} = useSelector((state) => state.user);
    const params = useParams();
    const [doctors, setDoctors]= useState([]);
    const [date,setDate] = useState("");
    const [time, setTime] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [isAvailable, setIsAvailable] = useState();
    const dispatch = useDispatch();
  //login user data
  const getUserData = async () => {
    try {
      const res = await axios.post('/api/v1/doctor/getDoctorById',{doctorId: params.doctorId},{
        headers: {
          Authorization : "Bearer " + localStorage.getItem('token'),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //========== Booking function ======
  const handleBooking = async (e) => {
    try {
        e.preventDefault();
        setIsAvailable(true);
        if (!date && time) {
          return alert("Date & Time Required");
        }
        dispatch(showLoading());
        const res = await axios.post('/api/v1/user/book-appointment',
            {
                doctorId: params.doctorId,
                userId: user._id,
                doctorInfo: doctors,
                userInfo: user,
                date: date,
                time: time,
                name:name,
                phone:phone,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );
        dispatch(hideLoading());
        if (res.data.success) {
            message.success(res.data.message);
        }
    } catch (error) {
        dispatch(hideLoading());
        console.log(error);
    }
  };

  // ============ handle availability
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/booking-availability',
      {doctorId: params.doctorId, date, time},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(hideLoading());
      if(res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
        <h1 align="center" className='sub-head'>Booking Page</h1><br></br>
        <div className='container m-2'>
            {doctors && (
                <div className='bookingPage'>
                    <h4>Dr. {doctors.firstName} {doctors.lastName} </h4>
                    <h4>Specialization : {doctors.specialization} </h4>
                    <h4>Fees : {doctors.feesPerConsultation} </h4><br></br>
                    {/* <h4>Timings : {doctors.timings && doctors.timings[0]} -{" "} {doctors.timings && doctors.timings[1]}{" "} </h4> */}
                    <div className='d-flex flex-column w-50'>
                      <h5>Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type='text' value={name} onChange={(e) => setName(e.target.value)} required/>
                        </h5>
                      <h5>Phone Number:&nbsp; <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                        </h5>
                      <h5>Select Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type='date' value={date} onChange={(e) => setDate(e.target.value)} required/>
                      </h5>
                      <h5>Select Time:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type='time' value={time} onChange={(e) => setTime(e.target.value)} required/>
                        </h5><br></br>
                        <button className='btn btn-primary mt-2' onClick={handleAvailability}>
                            Check Availability
                        </button><br></br>
                        <button className='btn btn-dark mt-2' onClick={handleBooking}>
                          Book Now
                        </button><br></br>
                         <br></br>
                        
                    </div>
                </div>
            )}
        </div>

    </Layout>
  );
};

export default BookingPage;