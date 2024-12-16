import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloud from './config/cloudinary.js'
import adminRoute from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRouter.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended:true }));
connectDB();
connectCloud();

//api endpoints
app.use('/api/admin', adminRoute);
app.use('/api/doctors', doctorRouter);
app.use('/api/user', userRouter);

app.get("/", (req, res) => {
    return res.json("Api Working");
});

// export default app
app.listen(port, () => console.log("App started at", port));