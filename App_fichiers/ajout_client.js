import React, { useState, useRef } from 'react';
import Information from './Information';
import jsonData from './fichier_csv';
import App from '../App';
import ReactDOM from 'react-dom';
import CreerListe from './creer_liste';
import { Retrouver_ligne_clients } from './liste';
import BarreRecherche from './barre_de_recherche';
import Menu2 from './menu_deroulant';


// Chemin du fichier CSV
const filePath = 'src/fichier_csv/Contacts.csv';


const fs = require('fs');

export function AjoutClient(){

  function modifierFichierCSV() {

    // Lecture du fichier CSV existant
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const newData = 

      document.getElementById("﻿Société").value + ";" +
      document.getElementById('Réseau').value + ";" +
      document.getElementById('Genre').value + ";" +
      document.getElementById('Nom').value + ";" +
      document.getElementById('Prénom').value + ";" +
      document.getElementById('Adresse e-mail').value + ";" +
      document.getElementById('Ville').value + ";" +
      document.getElementById('Code postal').value + ";" +
      document.getElementById('Pays/région\r').value
    

      // Ajout de la nouvelle ligne au contenu existant
      const nouveauContenu = data + '\n' + newData;

      // Écriture du nouveau contenu dans le fichier CSV
      fs.writeFile(filePath, nouveauContenu, 'utf8', (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('La ligne a été ajoutée avec succès.');
      });
    });

  }





// AFFICHAGE FICHE



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


    <div id="content">
    {renderActivePage()}
    <div className="fiche">
      <form className="fiche-modifiable" >
        {Object.entries(jsonData[0]).map(([key, value]) => (
          <Information key={key} name={key} value={""} line={jsonData[0].__rowNum__} />
        ))}
        <input type="submit" value="Sauvegarder" />
      </form>

      <button className="rounded-button" onClick={() => ReactDOM.render(<App />, document.getElementById('root'))}>
        Retour au menu
      </button>

      <button className="rounded-button" onClick={() => modifierFichierCSV()}>
        Ajouter le client
      </button>

    </div>
    </div>
    </div>

  );
}


export function SupprimerClient(props){

  const ligne = props.ligne;

  function modifierFichierCSV(lineNumberToDelete) {



// Lecture du fichier CSV existant
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Conversion du contenu en tableau de lignes
  const lines = data.split('\n');

  // Vérification du numéro de ligne à supprimer
  if (lineNumberToDelete > 0 && lineNumberToDelete <= lines.length) {
    // Suppression de la ligne spécifiée
    lines.splice(lineNumberToDelete , 1);

    // Réassemblage des lignes en une seule chaîne de caractères
    const updatedContent = lines.join('\n');

    // Écriture du contenu mis à jour dans le fichier CSV
    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('La ligne a été supprimée avec succès.');
    });
  } else {
    console.error('Numéro de ligne invalide.');
  }
});

  }

  return (

    <div>
      <button onClick={() => modifierFichierCSV(ligne)} >Supprimer le client</button>
    </div>


  );


}