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

    // set existing ids starting with 2
    noteArray.forEach((note, index) => {
        note.id = index + 2;
    });

    // add new note to beginning of array with an id of 1
    newNote.id = 1;
    noteArray.unshift(newNote);

    // write to file
    fs.writeFileSync('./db/db.json', JSON.stringify(noteArray));

    // respond with 200 ok
    res.sendStatus(200);
});

app.delete('/api/notes/:id', (req, res) => {
    let file = fs.readFileSync('./db/db.json');
    let noteArray = JSON.parse(file);
    
    // remove note from array
    noteArray.splice(req.params.id - 1, 1);

    // update ids
    noteArray.forEach((note, index) => {
        note.id = index + 1;
    });

    // write updated array to file
    fs.writeFileSync('./db/db.json', JSON.stringify(noteArray));

    // respond with 200 ok
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Web server listening on port: ${PORT}`));