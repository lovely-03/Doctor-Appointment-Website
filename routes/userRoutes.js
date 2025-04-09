const express = require("express");
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController, userProfileController } = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routes
//LOGIN || POST
router.post('/login', loginController);

//REGISTER || POST 
router.post('/register', registerController);

//AUTH || POST
router.post('/getUserData', authMiddleware, authController);

//APPLY DOCTOR || POST
router.post('/apply-doctor', authMiddleware, applyDoctorController);

//Notification DOCTOR || POST
router.post('/get-all-notification', authMiddleware, getAllNotificationController);

//Notification DOCTOR || POST
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);

// GET ALL DOC
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);

// BOOK APPOINTMENT
router.post('/book-appointment', authMiddleware, bookAppointmentController);

//Booking Availability
router.post('/booking-availability', authMiddleware, bookingAvailabilityController);

// Appointments List
router.get('/user-appointments', authMiddleware, userAppointmentsController);

// User Profile
router.post('/userProfile', authMiddleware, userProfileController);

module.exports = router;
