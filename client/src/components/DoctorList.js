import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/DoctorListStyles.css";

const DoctorList = ({doctor}) => {
    const navigate = useNavigate();
  return (
    <>
    <div className='card p-0 m-2' style={{cursor: "pointer"}} onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}>
        <div className='card-header'>
            Dr. {doctor.firstName} {doctor.lastName}
        </div>    
        <div className='card-body'>
            <p>
                <b>Specialization</b> {doctor.specialization}
            </p>
            <p>
                <b>Experience</b> {doctor.experience}
            </p>
            <p>
                <b>Fees Per Consultation</b> {doctor.feesPerConsultation}
            </p>
        </div>
    </div>   
    </>
  );
};

export default DoctorList;