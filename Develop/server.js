const fs = require('fs');
const express = require('express');
const http = require('http'); 
const { v4: uuidv4 } = require('uuid');
const path = require("path");

const app = express();

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 3000;

const server = http.createServer(() => {
    module.exports = function (app) {
        app.get("/api/notes", (req, res) => {
            module.exports = function (app){              
                            
                app.get('/notes', function(req, res) {
                    res.sendFile(path.join(__dirname, '/public/notes.html'));
                });
            
                app.get('*', function(req, res) {
                    res.sendFile(path.join(__dirname, '/public/index.html'));
                });
            };
            let data = JSON.parse(fs.readFileSync("/db/db.json"), "utf8");
            res.json(data);
        });        
        app.post("/api/notes", (req, res) => {
            const newNote = req.body;
            newNote.id = uuidv4();
            let data = JSON.parse(fs.readFileSync("/db/db.json", "utf8"));
            data.push(newNote);
            fs.writeFileSync('/db/db.json', JSON.stringify(data));
            res.json(data);    
        });
    };
    
  });
  
  server.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
  });



// app.listen(PORT, function() {
//     console.log(`listening on PORT: ${PORT}`);  
// });