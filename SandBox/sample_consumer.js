#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
var args = process.argv.slice(2);
amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var ex = 'PinkTest';

        ch.assertExchange(ex, 'direct', {durable: true});

        ch.assertQueue('Blue', {exclusive: false}, function(err, q) {
            console.log(' [*] Waiting for logs. To exit press CTRL+C');

            ch.bindQueue(q.queue,ex);

            // args.forEach(function(severity) {
            //     ch.bindQueue(q.queue, ex, severity);
            // });

            ch.consume(q.queue, function(msg) {
                console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
            }, {noAck: true});
        });
    });
});