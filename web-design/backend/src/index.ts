import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { sessions, Booking } from './db';
import { sessionsData } from './sessionsData';
import { Session } from 'inspector';

const app = express();
app.use(express.json())
app.use(cors())
const port = 3001;

app.post('/bookings', async (req: Request, res: Response) => {
    try {
        const { sessionid, title, firstName, lastName, mobile, email, countryCode, detailTitle, detailFirstName, detailLastName } = req.body;


        const session = await sessions.findOne({
            where: {
                id: sessionid,
                available: true
            }
        });

        if (!session) {
            return res.status(400).json({
                status: 'error',
                message: '該時段不可用或不存在'
            });
        }
        const newCustomer = await Booking.create({
            sessionId: sessionid,
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

