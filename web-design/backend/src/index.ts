import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { sessions, Booking } from './db';


const app = express();
app.use(express.json())
app.use(cors())
const port = 3001;

app.post('/bookings', async (req: Request, res: Response) => {
    try {
        const { title, firstName, lastName, mobile, email, countryCode, detailTitle, detailFirstName, detailLastName } = req.body;

        const newCustomer = await Booking.create({
            title,
            firstName: firstName || null,
            lastName: lastName || null,
            mobile: mobile || null,
            email: email || null,
            countryCode: countryCode || null,
            detailTitle,
            detailFirstName,
            detailLastName,
            status: 'pending',
            id: 1,
            userId: 1,
            sessionId: 1
        })
        console.log(newCustomer)

        res.json({
            status: 'success',
            data: newCustomer
        })
    } catch (error: any) {
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
})

app.post('/sessions', async (req: Request, res: Response) => {


    try {
        const { startTime, endTime, data, location } = req.body;

        const newSession = await sessions.findAll({

            where: {
                startTime,
                endTime,
                data,
                location
            }
        })
        res.json({
            status: 'success',
            data: newSession
        })
    } catch (error: any) {
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
})

app.get('/bookings', async (req: Request, res: Response) => {
    try {
        const newCustomer = await Booking.findAll();
        res.json({
            status: 'success',
            data: newCustomer
        });
    } catch (error: any) {
        res.json({
            status: 'error',
            message: error.message
        });
    }
});




app.get('/', (req, res) => {
    res.send('Hello World from TypeScript!');
});

app.listen(port, () => {
    console.log(`應用程式正在監聽 ${port} 端口`);
});

