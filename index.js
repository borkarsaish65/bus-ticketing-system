const express = require('express');
const app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// 404 error
app.all('*', (req, res, next) => {
console.log(req);
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});


app.listen(port=8080, () =>
    console.log(`🚀 Server running on port ${port}!`)
);