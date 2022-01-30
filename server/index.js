const express = require('express');
const sequelize = require('sequelize');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const db = require('./models');

//Routers
const movieRouter = require('./routes/Movies');
app.use('/movies',movieRouter);

const userRouter = require('./routes/Users');
app.use('/auth',userRouter);

const roomRouter = require('./routes/Rooms');
app.use('/room',roomRouter);

const schedulesRouter = require('./routes/Schedules');
app.use('/schedules',schedulesRouter);

const scheduleRouter = require('./routes/Schedule');
app.use('/schedule',scheduleRouter);

const ordersRouter = require('./routes/Orders');
app.use('/orders',ordersRouter);


db.sequelize.sync().then(() => {
    app.listen(3001,() => {
        console.log('server is running on port 3001');
    });
});