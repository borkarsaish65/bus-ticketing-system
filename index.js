const express = require('express');
const app = express();
const ticketsRouter = require('./src/routes/tickets.router');
const HttpException = require('./src/helper/HttpException');
const errorMiddleware = require('./src/middlewares/error.middleware');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(express.urlencoded({
    limit: '50mb',
    extended: true
}));

app.use('/api',ticketsRouter)

app.all('*', (req, res, next) => {
console.log(req);
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

app.use(errorMiddleware);


app.listen(port=8080, () =>
    console.log(`🚀 Server running on port ${port}!`)
);