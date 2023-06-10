const fichier_csv = '/fichier_csv/Contacts.csv'

const fs = require('fs');
const XLSX = require('xlsx');

// Lire le contenu du fichier CSV
const csvContent = fs.readFileSync('fichier.csv', 'utf-8');

// Convertir le contenu CSV en un tableau d'objets JavaScript (ou utilisez votre propre logique de traitement CSV ici)
const data = processData(csvContent);

// Créer un nouveau classeur XLSX
const workbook = XLSX.utils.book_new();

// Créer une feuille de calcul à partir des données
const worksheet = XLSX.utils.json_to_sheet(data);

// Ajouter la feuille de calcul au classeur
XLSX.utils.book_append_sheet(workbook, worksheet, 'Feuille1');

// Écrire le classeur dans un fichier XLSX
XLSX.writeFile(workbook, 'fichier.xlsx');

export default workbook;