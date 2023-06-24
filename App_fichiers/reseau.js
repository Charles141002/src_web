import { useState, useEffect } from "react";
import BarreRechercheEntreprises from "./barre_recherche_entreprises";
import { Liste_entreprises, Dictionnaire_reseaux_entreprises } from "./liste";
import App from "../App";
import  ReactDOM  from "react-dom";
import jsonData from "./fichier_csv";
import VoirClientsReseau from "./voir_clients_reseau";
import Entreprise from "./entreprise";

function Reseau(props){

    console.log('EEE')

    const reseau = props.reseau;
    const liste_entreprises = Liste_entreprises();
    const dictionnaireReseauxEntreprises = Dictionnaire_reseaux_entreprises();

    // RECHERCHE DES ENTREPRISES DU RESEAU 

    const [liste_entreprises_du_reseau, setListeEntreprisesDuReseau] = useState([]);
    useEffect(() => {
        const optionTemp = [];
        for (let k = 0; k < liste_entreprises.length; k++) {
          const entreprise = liste_entreprises[k];
          if (dictionnaireReseauxEntreprises[props.reseau].includes(entreprise)) {
            optionTemp.push(entreprise);
          }
        }
        setListeEntreprisesDuReseau(optionTemp);
      }, [reseau]);

    return (

        <div>
            <BarreRechercheEntreprises reseau={props.reseau}/>
            <button onClick={() =>ReactDOM.render(<VoirClientsReseau reseau={props.reseau}/>, document.getElementById('root'))}>Voir les clients de ce réseau</button>
            {liste_entreprises_du_reseau.map(entreprise => <div><button className="rounded-button" onClick={() => ReactDOM.render(<Entreprise entreprise={entreprise} />, document.getElementById('root'))}>{entreprise}</button><p className="newline"></p></div>)}
<p className="newline"></p>
            <button className="rounded-button" onClick={() => ReactDOM.render(<App />, document.getElementById('root'))}> Retour au menu </button>
        </div>
    )
}

export default Reseau;