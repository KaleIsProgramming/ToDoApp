export const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoConnect = require('./util/database').mongoConnect;
import { Request, Response, NextFunction } from 'express';

const app = express();

app.use(bodyParser.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization');
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    next();
});

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,    
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

const adminRoutes = require('./routes/admin');

app.use(adminRoutes);





mongoConnect(() => {
    app.listen(3001);
})