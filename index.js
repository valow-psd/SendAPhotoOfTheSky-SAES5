const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware pour le parsing des données JSON. Vous devrez ajouter un parser pour les données multipart.
app.use(bodyParser.json());

app.post('/upload', (req, res) => {
    // Ici, vous devrez gérer la réception du fichier manuellement.
    // Cet exemple est très simplifié et suppose que vous recevez les données de l'image directement.
    // Dans la pratique, il serait beaucoup plus complexe de gérer les données multipart/form-data.

    const imageData = req.body.image; // Supposons que l'image est envoyée en tant que chaîne base64
    const buffer = Buffer.from(imageData, 'base64');
    const filePath = path.join(__dirname, '/tmp/images/', 'uploaded_image.jpg');

    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            return res.status(500).send('Error saving the image');
        }
        res.send('Image téléchargée avec succès.');
    });
});

app.get('/image/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '/tmp/images/', filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('File not found');
        } else {
            res.sendFile(filePath);
        }
    });
});


app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
