import { Retrouver_ligne_clients } from "./liste";
import React, { useState, useEffect, useRef } from "react";
import { Liste_entreprises, Dictionnaire_reseaux_entreprises } from "./liste";
import { Liste_clients_agences, Dictionnaire_entreprises_clients } from "./liste";
import { fichier_csv } from "./fichier_csv";

const fs = require('fs');
const filePath = fichier_csv;



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
        
        
                    // Ajouter les nouvelles données à la feuille de calcul
                    const newData = [
                      [
                        nouvelleValeur
                    ]
                    ];
            
              const colonnes = lignes[ligneAmodifier].split(';');
        
              colonnes[modifIndex] =newData[0][0];
        
              lignes[ligneAmodifier] = colonnes.join(';');
        
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
      
    

    
  return (liste_clients_du_reseau);
  
    }