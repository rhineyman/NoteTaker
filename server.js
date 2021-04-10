const fs = require('fs');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});
app.get('/notes', (req, res) => { 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
  fs.readFile ("./db/db.json", "utf8", (err, response) => {
    if (err) throw err;
    let allNotes = JSON.parse(response)
    res.json(allNotes)
  })
});

app.post('/api/notes', (req, res) => {
  const newNotes = { ...req.body, id : uuidv4() }
  fs.readFile ("./db/db.json", "utf8", (err, response) => {
    if (err) throw err;
    let allNotes = JSON.parse(response)
    allNotes = [...allNotes, newNotes]

    fs.writeFile("./db/db.json", JSON.stringify(allNotes), error => {
      if (error) throw error;      
      res.json(allNotes)
    })
  })
});

app.listen(PORT, () => {
    console.log(`listening on PORT: ${PORT}`)
});