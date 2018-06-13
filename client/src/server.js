"use strict";

const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

app.get('/api/getSpeech', (req, res) => {
    res.send({ express: 'HEY' });
});

app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
})