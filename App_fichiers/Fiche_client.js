import React, { useState, useRef } from 'react';
import Information from './Information';
import jsonData from './fichier_csv';
import App from '../App';
import ReactDOM from 'react-dom';
import CreerListe from './creer_liste';
import { Retrouver_ligne_clients } from './liste';
import BarreRecherche from './barre_de_recherche';
import Menu2 from './menu_deroulant';


function Fiche(props) {

// MODIFICATION FICHE

const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Chemin du fichier CSV à modifier
const filePath = 'src/fichier_csv/Contacts.csv';

// Ligne spécifique que vous souhaitez modifier
const ligneAmodifier = 3815; // Retrouver_ligne_clients(props.entite["Adresse e-mail"])

// Fonction pour modifier le fichier CSV
function modifierFichierCSV() {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Une erreur s\'est produite lors de la lecture du fichier CSV :', err);
      return;
    }

    // Remplacer "Promodis" par "Promododo" dans la colonne "Réseau"
    const lignes = data.split('\n');
    const entetes = lignes[0].split(';');
    const reseauIndex = entetes.indexOf('Réseau');
    const adressemailIndex = entetes.indexOf('Adresse e-mail');

    for (let i = 1; i < lignes.length; i++) {
      
      const colonnes = lignes[i].split(';');

      if (props.entite["Adresse e-mail"]==adressemailIndex){
        colonnes[reseauIndex] = 'AAAA AA AA AA AA';
      
      lignes[i] = colonnes.join(';');
    }
  }

    const fichierModifie = lignes.join('\n');

    // Écrire les données modifiées dans le fichier CSV
    fs.writeFile(filePath, fichierModifie, 'utf8', (err) => {
      if (err) {
        console.error('Une erreur s\'est produite lors de l\'écriture du fichier CSV :', err);
        return;
      }
      console.log('Le fichier CSV a été modifié avec succès.');
    });
  });
}

// Appel de la fonction pour modifier le fichier CSV
modifierFichierCSV();




// AFFICHAGE FICHE



  const liste = CreerListe(jsonData);
  console.log(liste[1]["CONSEIL SERVICE AGRI"]);


  const [data, setData] = useState(jsonData);
  console.log(props.entite["﻿Société"])

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Mise à jour des données avec les nouvelles valeurs
    const updatedData = { ...data };
    Object.entries(props.entite).forEach(([key, value]) => {
      updatedData[props.entite.__rowNum__][key] = document.getElementById(key).value;
    });
    setData(updatedData);

    // Enregistrement des données au format JSON (facultatif)
    const jsonDataStr = JSON.stringify(updatedData);
    // Faites ce que vous souhaitez avec les données JSON mises à jour

    // Par exemple, vous pouvez télécharger le fichier JSON
    const blob = new Blob([jsonDataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fichier_json.json';
    link.click();
    console.log('AAAA');
    console.log(jsonDataStr);
    console.log(updatedData);
  };

  const showFenetreGaucheRef = useRef(true);

  const [activePage, setActivePage] = useState('');

  const handleClick = (page) => {
    setActivePage(page);
  };

  const renderActivePage = () => {
    showFenetreGaucheRef.current = false;
    switch (activePage) {
      case 'afficherBarreRecherche':
        return <BarreRecherche donnees={jsonData}/>
      default:
        return null;
    }
  };


  return (


    <div className="container">
    <div className="menu">
      <button onClick={() => handleClick('afficherBarreRecherche')}>Afficher Barre de Recherche</button>
      <Menu2 datas={jsonData}/>
      
    </div>

    <div className="content">
    {renderActivePage()}
    <div className="fiche">
      <form className="fiche-modifiable" onSubmit={handleSubmit}>
        {Object.entries(props.entite).map(([key, value]) => (
          <Information key={key} name={key} value={value} line={props.entite.__rowNum__} />
        ))}
        <input type="submit" value="Sauvegarder" />
      </form>

      <button className="rounded-button" onClick={() => ReactDOM.render(<App />, document.getElementById('root'))}>
        Retour au menu
      </button>

    </div>
    </div>
    </div>

  );
}

export default Fiche;
