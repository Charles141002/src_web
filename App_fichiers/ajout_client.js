import React from 'react';


// Chemin du fichier CSV
const filePath = 'src/fichier_csv/Contacts.csv';


function AjoutClient(){
    console.log('AAAA');

    const fs = require('fs');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Une erreur s\'est produite lors de la lecture du fichier CSV :', err);
          return;
        }
    
        // Remplacer "Promodis" par "Promododo" dans la colonne "Réseau"
        const lignes = data.split('\n');

// Ligne à ajouter
const ligneAAjouter = 'Nouvelle société;Nouveau réseau;Nouveau genre;Nouveau nom;Nouveau prénom;nouveau@email.com;Nouvelle ville;Nouveau code postal;Nouveau pays';

const fichierModifie = lignes.join('\n'+ligneAAjouter);

// Ajouter la ligne au fichier CSV
fs.appendFile(filePath, fichierModifie, 'utf8', (err) => {
  if (err) {
    console.error('Une erreur s\'est produite lors de l\'ajout de la ligne au fichier CSV :', err);
    return;
  }
  console.log('La ligne a été ajoutée avec succès.');
});
});

}

export default AjoutClient;