import express from 'express';
import redis from 'redis';

var app = express();

app.get('/', (req, res) => {
    res.send('hello world');
});

var client = redis.createClient();

app.post('/product', (req, res) => {
    var product = {};
    client.rpop('products', (err, productStr) => {
        if (err) {
            console.log('error!');
        } else {
            product = JSON.parse(productStr);
            console.log(product);
        }
    });
    res.send('OK');
});

app.listen(8081, () => {
    console.log('Server is running at port 8081');
});