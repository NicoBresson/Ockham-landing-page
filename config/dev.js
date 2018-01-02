'use strict'

module.exports = {
    redis_db_options: {
        port: 17283,
        host: 'redis-17283.c8.us-east-1-3.ec2.cloud.redislabs.com',
        password: 'h83rYV6lYtMDbBFrQB5a'
    },
    cookie_name: 'ockham.sid',
    cookie_options: {
        maxAge: 30 * 1000,
        path: '/',
        httpOnly: true
            // secure: true // ===> HTTPS
    },
    server_port: 3000,
    secret: '9&v8uWV9c4iknFSCTX5936V9a52jXLq@pAZXwqr%Q0kyEmRD2MjFn',
    update: 'x2*a#bYdPmXo%01BafLh*m$A4yvk&zkXNVt1AtijF3$vThPP#5ST',
    hostname: 'http://127.0.0.1:3000/'
}
