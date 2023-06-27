import React, { useState, useRef } from 'react';
import Information from './Information';
import jsonData from './fichier_csv';
import App from '../App';
import ReactDOM from 'react-dom';
import CreerListe from './creer_liste';
import { Retrouver_ligne_clients } from './liste';
import BarreRecherche from './barre_de_recherche';
import Menu2 from './menu_deroulant';
import { SupprimerClient } from './ajout_client';
import { AjoutClient } from './ajout_client';
import ExportEnVCF from './bouton_exporter_en_vcf';


function Fiche(props) {

console.log(props);


// MODIFICATION FICHE

const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Chemin du fichier CSV à modifier
const filePath = 'src/fichier_csv/Contacts.csv';

// Ligne spécifique que vous souhaitez modifier
const ligneAmodifier = Retrouver_ligne_clients(props.entite["Adresse e-mail"]); // Retrouver_ligne_clients(props.entite["Adresse e-mail"])

// Fonction pour modifier le fichier CSV
function modifierFichierCSV() {


  console.log(document.getElementById('Code postal').value);
  console.log(document.getElementById('Nom').value);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Une erreur s\'est produite lors de la lecture du fichier CSV :', err);
      return;
    }

    // Remplacer "Promodis" par "Promododo" dans la colonne "Réseau"
    const lignes = data.split('\n');
    const entetes = lignes[0].split(';');

    const nomIndex = entetes.indexOf('Nom');
    const prenomIndex = entetes.indexOf('Prénom');
    const villeIndex = entetes.indexOf('Ville');
    const codepostalIndex = entetes.indexOf('Code Postal');
    const adressemailIndex = entetes.indexOf('Adresse e-mail');
    const societeIndex = entetes.indexOf("﻿Société");
    const paysIndex = entetes.indexOf('Pays/région')
    const reseauIndex = entetes.indexOf('Réseau');
    const genreIndex = entetes.indexOf('Genre');







    console.log(nomIndex);

            // Ajouter les nouvelles données à la feuille de calcul
            const newData = [
              [
                document.getElementById('Nom').value,
                document.getElementById('Prénom').value,
                document.getElementById('Ville').value,
                document.getElementById('Code postal').value,
                document.getElementById('Adresse e-mail').value,
                document.getElementById("﻿Société").value,
                document.getElementById('Pays/région').value,
                document.getElementById('Réseau').value,
                document.getElementById('Genre').value,
            ]
            ];
    
            console.log(newData[0][0]);
            console.log(newData);
    
    
      const colonnes = lignes[ligneAmodifier].split(';');


        colonnes[nomIndex] =newData[0][0];
        colonnes[prenomIndex] = newData[0][1];
        colonnes[villeIndex] = newData[0][2];
        colonnes[codepostalIndex] = newData[0][3];
        colonnes[adressemailIndex]= newData[0][4];
        colonnes[societeIndex]= newData[0][5];
        colonnes[paysIndex]= newData[0][6];
        colonnes[reseauIndex]= newData[0][7];
        colonnes[genreIndex]= newData[0][8];

      
      lignes[ligneAmodifier] = colonnes.join(';');

      console.log(newData[0][4])
      console.log(lignes[ligneAmodifier]);
  

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
        case 'afficherAjoutlient':
          return <AjoutClient />
      default:
        return null;
    }
  };


  // CHANGER L HEURE DE CONSULTATION DE LA FICHE

  var currentDate = new Date();
  var dateString = currentDate.toDateString(); // Convertir la date en une représentation de chaîne de caractères


  console.log(dateString);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Une erreur s\'est produite lors de la lecture du fichier CSV :', err);
      return;
    }

    const lignes = data.split('\n');
    const entetes = lignes[0].split(';');

    const modifIndex = entetes.indexOf('Dernière Modif\r');

    console.log(modifIndex);

            // Ajouter les nouvelles données à la feuille de calcul
            const newData = [
              [
                dateString
            ]
            ];
    
      const colonnes = lignes[ligneAmodifier].split(';');

      colonnes[modifIndex] =newData[0][0];

      lignes[ligneAmodifier] = colonnes.join(';');

      console.log(lignes[ligneAmodifier]);
      console.log(colonnes);

  
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





  return (


    <div className="container">
    <div id="menu">
      <button onClick={() => handleClick('afficherBarreRecherche')}>Afficher Barre de Recherche</button>
      <button onClick={() => handleClick('afficherAjoutlient')}> Ajout Client  </button>

      <Menu2 datas={jsonData}/>
      
    </div>

    <div id="content">

    {renderActivePage()}
    <div className="fiche">
      <form className="fiche-modifiable" >
        {Object.entries(props.entite).map(([key, value]) => (
          <Information key={key} name={key} value={value} line={props.entite.__rowNum__} />
        ))}
        <input type="submit" value="Sauvegarder" />
      </form>
      <p className="newline"></p>



      <button className="rounded-button" onClick={() => ReactDOM.render(<App />, document.getElementById('root'))}>
        Retour au menu
      </button>
      <p className="newline"></p>

      <button className="rounded-button" onClick={() => modifierFichierCSV()}>
Tester chagement info fiche      </button>

<p className="newline"></p>

<ExportEnVCF entite={props.entite}/>


<p className="newline"></p>
<SupprimerClient ligne={ligneAmodifier}/>


    </div>
    </div>
    </div>

  );
}

export default Fiche;
