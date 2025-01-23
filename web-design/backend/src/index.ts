import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { customer } from './db';

const app = express();
app.use(express.json())
app.use(cors())
const port = 3000;

app.post('/customers', async (req: Request, res: Response) => {
    try {
        const { title, firstName, lastName, mobile, email, countryCode, detailTitle, detailFirstName, detailLastName } = req.body;

        const newCustomer = await customer.create({
            title,
            firstName,
            lastName,
            mobile,
            email,
            countryCode,
            detailTitle,
            detailFirstName,
            detailLastName
        })
        res.json({
            status: 'success',
            data: newCustomer
        })
    } catch (error: any) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
})
app.get('/customers', async (req: Request, res: Response) => {
    try {
        const newCustomer = await customer.findAll();
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

