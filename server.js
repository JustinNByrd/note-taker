const express = require("express");
const path = require("path");
const fs = require('fs');

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

app.use(express.json());

app.post('/api/notes', (req, res) => {
    let file = fs.readFileSync('./db/db.json');
    let noteArray = JSON.parse(file);
    let newNote = req.body;
    noteArray.forEach((item, index) => {
        item.id = index + 1;
    });
    newNote.id = 0;
    noteArray.unshift(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(noteArray));
});

app.listen(PORT, () => console.log(`Web server listening on port: ${PORT}`));