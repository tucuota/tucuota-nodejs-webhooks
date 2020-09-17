const express = require('express')
const crypto = require('crypto')
const fs = require('fs')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

const webhookSecret = process.env.TC_API_WEBHOOK_SECRET;

app.get('/', function (req, res) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.send(`${fullUrl}webhook`)
})

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {

    const content = req.body;
    const timestamp = req.headers['tucuota-timestamp'];
    const signature = req.headers['tucuota-signature'];

    if (!timestamp || !signature) {
        throw Error('Webhook Error: Headers not received.');
    }

    const expectedSignature = crypto.createHmac('sha256', webhookSecret)
        .update(content + timestamp, 'utf8')
        .digest('hex');

    console.log('signature: ', signature)
    console.log('expectedSignature: ', expectedSignature)

    if (signature != expectedSignature) {
        throw Error('Webhook Error: Unexpected signature.');
    }

    console.log('✅ Success! Received event');
    console.log(JSON.parse(content))

    // Return
    return res.send({
        received: true
    });

});

app.listen(port, function () {
    console.log('Example app listening on port ' + port)
});