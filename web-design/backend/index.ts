const express = require('express');
const app = express();
const post = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log(`應用程式正在監聽 3000端口`);
});