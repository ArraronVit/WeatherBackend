const express = require('express');
const mongoose = require('mongoose');
const {router} = require('./js/router');

const PORT = process.env.PORT || 3000;

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

app.use(router);

async function start() {
    try {
        await mongoose.connect('mongodb+srv://Arraron:9611543Vv@clustervitalya.tg6eh.mongodb.net/VitalyaDatabase', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start().then();

