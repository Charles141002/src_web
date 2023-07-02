import { Retrouver_ligne_clients } from "./liste";
import React, { useState, useEffect, useRef } from "react";
import BarreRechercheClients from "./barre_recherche_client";
import { Liste_entreprises, Dictionnaire_reseaux_entreprises } from "./liste";
import App from "../App";
import  ReactDOM  from "react-dom";
import { Liste_clients_agences, Dictionnaire_entreprises_clients } from "./liste";
import BarreRechercheClientsReseau from "./barre_recherche_clients_reseau";
import { Retrouver_infos_clients } from "./liste";
import PetiteFiche from "./Petite_fiche";
import Menu2 from "./menu_deroulant";
import jsonData from "./fichier_csv";
import BarreRecherche from "./barre_recherche_clients_reseau";


const fs = require('fs');
const filePath = 'src/fichier_csv/Contacts.csv';



function ChangementTauxNiveauReseau(props){

    function modifierTaux(){

    const liste_client = voirClientsReseauRetourneListeMail(props.reseau);
    const nouvelleValeur = value; 

        fs.readFile(filePath, 'utf8', (err, data) => {
          let lignes = data.split('\n');

          for (const client of liste_client){
            const ligneAmodifier = Retrouver_ligne_clients(client);

            if (err) {
              console.error('Une erreur s\'est produite lors de la lecture du fichier CSV :', err);
              return;
            }
            

            let entetes = lignes[0].split(';');
        
            let modifIndex = entetes.indexOf('Taux');
        
            console.log(modifIndex);
        
                    // Ajouter les nouvelles données à la feuille de calcul
                    const newData = [
                      [
                        nouvelleValeur
                    ]
                    ];
            
              const colonnes = lignes[ligneAmodifier].split(';');
        
              colonnes[modifIndex] =newData[0][0];
        
              lignes[ligneAmodifier] = colonnes.join(';');
        
              console.log(lignes[ligneAmodifier]);
              console.log(colonnes);
        
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

})
   

}

    const [value, setValue] = useState('');
    console.log(value);
    const handleChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }



    return(
        <div className="fiche-taux">

            <form >
                <label >Taux du réseau :  </label>
                <input class="info" type="text"  onChange={handleChange} value={value} id="Taux"/>
                <input type="submit" value="Sauvegarder" />
            </form>

            <p className="newline"></p>

            <button className="rounded-button" onClick={() => modifierTaux()}>
                Modifier le Taux
            </button>

        </div>
    );

}

export default ChangementTauxNiveauReseau;




function voirClientsReseauRetourneListeMail(reseau){

    console.log('EEE')
  
    const liste_entreprises = Liste_entreprises();
    const dictionnaireReseauxEntreprises = Dictionnaire_reseaux_entreprises();
    const liste_clients_agences = Liste_clients_agences();
    const dictionnaireEntreprisesClients = Dictionnaire_entreprises_clients();  
  
    let liste_clients_du_reseau = [];

        const optionTemp = [];
        for (let k = 0; k < liste_entreprises.length; k++) {
  
          const entreprise = liste_entreprises[k];
          for (let i =0 ; i < liste_clients_agences.length; i++){
            const client = liste_clients_agences[i]
          if (dictionnaireReseauxEntreprises[reseau].includes(entreprise) && dictionnaireEntreprisesClients[entreprise].includes(client)) {
            optionTemp.push(client);
          }
          }
        }
        liste_clients_du_reseau =optionTemp;
      
    

  
console.log(liste_clients_du_reseau);
  
  return (liste_clients_du_reseau);
  
    }