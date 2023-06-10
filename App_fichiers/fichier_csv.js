const fichier_csv = 'src/fichier_csv/Contacts.csv'

const fs = require('fs');
const XLSX = require('xlsx');

// Lire le contenu du fichier CSV
const csvContent = fs.readFileSync(fichier_csv, 'utf-8');

const jsonData = csvToJson(csvContent);

function csvToJson(csvContent) {

    const lines = csvContent.split('\n');
    const headers = lines[0].split(';');
  
    const jsonData = [];
  
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(';');
      const obj = {};
  
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = values[j];
      }
  
      jsonData.push(obj);
    }
  
    return jsonData;
  }

export default jsonData;