import express from 'express';
import {addDoctor,adminLogin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import adminAuth from '../middlewares/adminAuth.js';

const adminRoute = express.Router();

adminRoute.post('/add-doctor', adminAuth, upload.single('img'), addDoctor);
adminRoute.post('/login', adminLogin);

export default adminRoute;