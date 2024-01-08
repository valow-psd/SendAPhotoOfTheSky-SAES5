const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Configurer Multer pour utiliser le répertoire /tmp
const upload = multer({ dest: '/tmp' });

// Route pour le téléchargement des images
app.post('/upload', upload.single('photo'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('Please upload a file');
    }
    res.send('Image téléchargée avec succès.');
});

// Route pour lister toutes les images téléchargées
app.get('/list-images', (req, res) => {
    fs.readdir('/tmp', function (err, files) {
        if (err) {
            res.status(500).send('Unable to scan directory: ' + err);
            return;
        }
        let fileList = files.map(file => {
            return { name: file };
        });
        res.send(fileList);
    });
});

// Route pour récupérer une image spécifique
app.get('/image/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join('/tmp', filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('File not found');
            return;
        }
        res.sendFile(filePath);
    });
});

app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
