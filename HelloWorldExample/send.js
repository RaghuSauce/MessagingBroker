#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (err,conn) {
   conn.createChannel(function (err,ch) {
       var q = 'hello' //The Channel we are connecting to

       ch.assertQueue(q,{durable:false});
       ch.sendToQueue(q, new Buffer('Truck Nuts'));
       console.log("[x] sent to hello world")
   });
    setTimeout(function() { conn.close(); process.exit(0) }, 500);
});


