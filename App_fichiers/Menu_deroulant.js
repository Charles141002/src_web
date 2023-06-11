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
      
      
    console.log(dictionnaireReseauxEntreprises);

    
      


    return (
        <div id="menu-deroulant">
          <div className="reseaux-container">
            {reseaux.map((reseau) => (
              <div key={reseau}>
                <button
                  className="reseau-button"
                  onClick={() => handleSelectionReseau(reseau)}
                >
                  {reseau}
                </button>
                {reseau === selectedReseau && (
                  <div className="entreprises-container">
                    {entreprises.map((entreprise) => (
                      <button key={entreprise} className="entreprise-button">
                        {entreprise}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
}




  

export default Menu;