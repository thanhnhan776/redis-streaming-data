var redis = require('redis');
var client = redis.createClient();

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on('error', err => {
    console.log('Error: ' + err);
});

