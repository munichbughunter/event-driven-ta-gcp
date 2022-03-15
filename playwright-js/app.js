const express = require('express');
const app = express();

app.use(express.json());

app.post('/', (req, res) => {
    if (!req.body) {
        const msg = 'No Pub/Sub message received';
        console.error(`error: ${msg}`);
        res.status(400).send(`Bad Request: ${msg}`);
        return;
    }
    if (!req.body.message) {
        const msg = 'Invalid Pub/Sub message format';
        console.error(`error: ${msg}`);
        res.status(400).send(`Bad Request: ${msg}`);
        return;
    }

    const pubSubMessage = req.body.message;
    const name = pubSubMessage.data ? Buffer.from(pubSubMessage.data, 'base64').toString().trim() : '';
    
    const child_process = require('child_process');
    try {
        const result = child_process.spawnSync('npx', ['playwright', 'test', '__tests__/', '--reporter', 'list', '--config', 'playwright.config.js'], {encoding: 'utf8'});
        console.log(`Execution Result: \n ${result.stdout.toString()}`);
        res.status(204).send(`Message: ${result.stdout}`)
    } catch (err) {
        console.error(err);
        res.status(500).send(`Internal Server Error: ${err}`);
    }
});

module.exports = app;