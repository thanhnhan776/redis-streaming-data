import { Products } from './products';
import redis from 'redis';
import axios from 'axios';

var client = redis.createClient();
client.on('connect', () => {
    console.log('Redis client connected');
});
client.on('error', err => {
    console.log(err);
});

var writeProduct = () => {
    let index = Math.floor(Math.random() * (5 - 0) + 0);
    console.log('index = ' + index);
    let product = Products[index];

    client.lpush('products', JSON.stringify(product), redis.print);

    axios.post('http://localhost:8081/product')
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log('error');
        });
}

var loopWriteProduct = () => {
    setTimeout(
        () => {
            writeProduct();
            loopWriteProduct();
        },
        3000
    );
}

loopWriteProduct();
