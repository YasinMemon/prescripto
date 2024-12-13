import express from 'express';
import { getDoctors,docLogin, docAppointments } from '../controllers/doctorController.js';
import docAuth from '../middlewares/docAuth.js';

const doctorRouter = express.Router();

doctorRouter.get('/list',getDoctors);
doctorRouter.post('/login', docLogin);
doctorRouter.get('/appointments', docAuth , docAppointments)

export default doctorRouter;