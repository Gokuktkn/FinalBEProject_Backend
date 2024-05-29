import express from 'express'
import databaseService from './service/database.service.js';

const app = express();
app.use(express.json())

app.listen(8080, () => {
    databaseService.connect()
})