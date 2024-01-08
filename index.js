const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadPath = path.join(__dirname, '/tmp/images/');
if (!fs.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath, { recursive: true });
}

const upload = multer({ dest: uploadPath }); // Assurez-vous que ce dossier est accessible

const app = express();
const port = 3000;

// Route pour le téléchargement des images
const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send('Image téléchargée avec succès.');


// Route pour lister toutes les images téléchargées
app.get('/list-images', (req, res) => {
    const directoryPath = path.join(__dirname, '/tmp/images/');

    fs.readdir(directoryPath, function (err, files) {
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
    const filePath = path.join(__dirname, '/tmp/images/', filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('File not found');
            return;
        }
        res.sendFile(filePath);
    });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
