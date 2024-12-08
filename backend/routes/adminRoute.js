import express from 'express';
import {addDoctor,adminLogin, getAllDoctors } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import adminAuth from '../middlewares/adminAuth.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRoute = express.Router();

adminRoute.post('/add-doctor', adminAuth, upload.single('img'), addDoctor);
adminRoute.post('/login', adminLogin);
adminRoute.get('/all-doctors', adminAuth, getAllDoctors);
adminRoute.post('/change-status', adminAuth, changeAvailability);

export default adminRoute;