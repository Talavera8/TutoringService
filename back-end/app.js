const express = require('express');
const usersRouter = require('./Routes/usersRoutes');
const requestsRouter = require('./Routes/tutoringRequestsRoutes');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log("App running on port" + port);
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json());

app.use("/users", usersRouter);
app.use("/requests", requestsRouter);

