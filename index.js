import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'


import databaseService from './service/database.service.js';
import { userRegister } from './routes/user.route.js';
import ErrorHandler from './error.handler.js';

const app = express();


config()
app.use(express.json())
app.use(cors())

app.use('/user', userRegister)

app.use(ErrorHandler);


// ON START
app.listen(process.env.PORT, async (err) => {
    await databaseService.connect()
    console.log(`Banh truong lanh dia\nhttp://localhost:${process.env.PORT}`)
})


// ON EXIT
process.on('SIGINT', function () {
    console.log("\nServer bị đóng bởi tổ hợp phím Ctrl + C");
    process.exit(1);
});