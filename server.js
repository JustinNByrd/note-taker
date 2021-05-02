const express = require("express");
const path = require("path");
const fs = require('fs');
const { RSA_NO_PADDING } = require("constants");

const app = express();

// check for env setting (heroku compatibility) or use 8080
const PORT = parseInt(process.env.PORT) || 8080;

app.use(express.static('./public'));
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    let file = fs.readFileSync('./db/db.json');
    let jsonData = JSON.parse(file);
    res.send(jsonData);
});

app.listen(PORT, () => console.log(`Web server listening on port: ${PORT}`));