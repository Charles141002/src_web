import { useState } from "react";
import BarreRechercheEntreprises from "./barre_recherche_entreprises";
import { Liste_entreprises, Dictionnaire_reseaux_entreprises } from "./liste";

function Reseau(props){

    console.log('EEE')

    const reseau = props.reseau;
    const liste_entreprises = Liste_entreprises();
    const dictionnaireReseauxEntreprises = Dictionnaire_reseaux_entreprises();

    // RECHERCHE DES ENTREPRISES DU RESEAU 

    const [liste_entreprises_du_reseau, setListeEntreprisesDuReseau] = useState([]);
    const optionTemp =[];

    for (let k = 0; k < liste_entreprises.length; k++) {

            
        const entreprise = liste_entreprises[k];


        if (dictionnaireReseauxEntreprises[props.reseau].includes(entreprise)){
          optionTemp.push(entreprise);
            }
      
    }
    setListeEntreprisesDuReseau(optionTemp);

    return (

        <div>
            {liste_entreprises_du_reseau.map(entreprise => <button>{entreprise}</button>)}
        </div>
    )
}

export default Reseau;