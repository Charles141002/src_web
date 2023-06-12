import { useState , useEffect } from "react";





function Menu(props){

    const [reseaux, setReseaux] = useState([]); // État pour stocker les réseaux
    const [entreprises, setEntreprises] = useState([]); // État pour stocker les entreprises correspondantes
    const [clients, setClients] = useState([]); // État pour stocker les clients des entreprises

  
    useEffect(() => {
      const reseaux = trouverReseaux(props.datas);
      setReseaux(reseaux);
    }, [props.datas]);
  
    const handleSelectionReseau = (reseau) => {
        const entreprises = dictionnaireReseauxEntreprises[reseau] || [];
        setEntreprises(entreprises);
      };
  
    const dictionnaireReseauxEntreprises = creerDictionnaireReseauxEntreprises(props.datas);
    const dictionnaireEntreprisesClients = creerDictionnaireEntreprisesClients(props.datas);
  
// TROUVER LES RESEAUX

    function trouverReseaux(tableauDonnees) {
        const reseaux = new Set(); // Utilisation d'un Set pour éliminer les doublons
        
        tableauDonnees.forEach((ligne) => {
          const reseau = ligne.Réseau;
          if (reseau) {
            reseaux.add(reseau);
          }
        });
        
        const reseauxTries = Array.from(reseaux).sort(); // Tri des réseaux par ordre alphabétique
        return reseauxTries;

    }
      
      console.log(reseaux);

// TROUVER LES ENTREPRISES CORRESPONDANTES AUX RESEAUX

      function creerDictionnaireReseauxEntreprises(tableauDonnees) {
        const dictionnaire = {};
      
        tableauDonnees.forEach((ligne) => {
          const reseau = ligne.Réseau;
          const entreprise = ligne["﻿Société"];
      
          if (reseau && entreprise) {
            if (!dictionnaire[reseau]) {
              dictionnaire[reseau] = new Set();
            }
            dictionnaire[reseau].add(entreprise);
          }
        });
      
        // Tri des entreprises par ordre alphabétique
        for (const reseau in dictionnaire) {
          dictionnaire[reseau] = Array.from(dictionnaire[reseau]).sort();
        }
      
        return dictionnaire;
      }

// TROUVER LES ENTREPRISES CORRESPONDANTES AUX CLIENTS

      function creerDictionnaireEntreprisesClients(tableauDonnees) {
        const dictionnaire = {};
      
        tableauDonnees.forEach((ligne) => {
          const entreprise = ligne["﻿Société"];
          const client = ligne["Nom"]
      
          if (client && entreprise) {
            if (!dictionnaire[entreprise]) {
              dictionnaire[entreprise] = new Set();
            }
            dictionnaire[entreprise].add(client);
          }
        });
      
        // Tri des entreprises par ordre alphabétique
        for (const entreprise in dictionnaire) {
          dictionnaire[entreprise] = Array.from(dictionnaire[entreprise]).sort();
        }
      
        return dictionnaire;
      }
      
      
    console.log(dictionnaireEntreprisesClients);

    console.log(dictionnaireReseauxEntreprises.Promodis);

    
// FONCTIONS QUI AFFICHE LES ENTREPRISES SI LE RESEAU EST CLIQUÉ

  const [montrer, setMontrer] = useState(false); 

  function montrerEntreprise(reseau) {

    if (montrer || dictionnaireReseauxEntreprises[reseau] == entreprises) {
      setEntreprises([]);
    }

    else {
    setEntreprises(dictionnaireReseauxEntreprises[reseau]);
    //setEntreprises(dictionnaireReseauxEntreprises.Promodis);
    setMontrer(true);
    }


  }


  console.log(entreprises);


// IL Y A LES LIENS ENTRE TOUS LES RESEAUX/ENTREPRISES/CLIENTS, IL SUFFIT MAINTENANT DE FAIRE LE HTML/CSS DE DEROULEMENT

    return (
        <div id="menu-deroulant">
          <div className="reseaux-container">
            {reseaux.map((reseau) => (
              <div key={reseau}>
                <button
                  className="reseau-button"
                  onClick={() => montrerEntreprise(reseau)}
                >
                  {reseau}
                </button>
                {entreprises.map((entreprise) => (
                <div>
                <button
                  className="reseau-button"
                >
                  {entreprise}
                </button>
                </div>
                ))}

              </div>
            ))}
          </div>
        </div>
      );
}




  

export default Menu;