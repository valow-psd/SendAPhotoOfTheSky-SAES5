const express = require('express');
const multer = require('multer');
const upload = multer({ dest: '/tmp/images/' });
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.post('/upload', upload.single('photo'), (req, res) => {
    console.log(req.file);
    res.send('Image téléchargée avec succès.');
});

app.get('/list-images', (req, res) => {
    const directoryPath = path.join(__dirname, '/tmp/images/');

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send('Unable to scan directory: ' + err);
        } 
        else {
            let fileList = files.map(file => {
                return { name: file };
            });
            res.send(fileList);
        }
    });
});


app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
