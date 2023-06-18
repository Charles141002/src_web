import { useState , useEffect } from "react";





function Menu2(props){

    const [reseaux, setReseaux] = useState([]); // État pour stocker les réseaux
    const [entreprises, setEntreprises] = useState([]); // État pour stocker les entreprises correspondantes
    const [clients, setClients] = useState([]); // État pour stocker les clients des entreprises
    const [open, setOpen] = useState(false);


  
    useEffect(() => {
      const reseaux = trouverReseaux(props.datas);
      setReseaux(reseaux);
    }, [props.datas]);
  
    const handleSelectionReseau = (reseau) => {
        const entreprises = dictionnaireReseauxEntreprises[reseau] || [];
        setEntreprises(entreprises);
      };
  
    const dictionnaireReseauxEntreprises = creerDictionnaireReseauxEntreprises(props.datas);
    //const dictionnaireEntreprisesClients = creerDictionnaireEntreprisesClients(props.datas);
  
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
    const client = ligne["Nom"];

    if (client && entreprise) {
      if (!dictionnaire[entreprise]) {
        dictionnaire[entreprise] = [];
      }
      dictionnaire[entreprise].push(client);
    }
  });

  // Tri des entreprises par ordre alphabétique
  for (const entreprise in dictionnaire) {
    dictionnaire[entreprise].sort();
  }

  return dictionnaire;
}

      
      
    //console.log(dictionnaireEntreprisesClients);

    console.log(dictionnaireReseauxEntreprises);

    

// IL Y A LES LIENS ENTRE TOUS LES RESEAUX/ENTREPRISES/CLIENTS, IL SUFFIT MAINTENANT DE FAIRE LE HTML/CSS DE DEROULEMENT

    return (
      <div className="dossier" >

        <div class="bloc-titre-deroulant" onDoubleClick={() => setOpen(!(open))} >
            
            <h1>kkkk</h1>
          
            <h1 onClick={() => setOpen(!(open))}>(open && {reseaux.map(elt => 
                <div className="bloc-titre-deroulant"><p>{elt}</p></div>)})
            </h1>
                vv
        </div>
      </div>
);
}

  

export default Menu2;





