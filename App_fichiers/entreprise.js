import { useState, useEffect } from "react";
import { Liste_clients_agences, Dictionnaire_entreprises_clients } from "./liste";
import App from "../App";
import  ReactDOM  from "react-dom";
import BarreRechercheClients from "./barre_recherche_client";
import PetiteFiche from "./Petite_fiche";
import { Retrouver_infos_clients } from "./liste";

function Entreprise(props){

    console.log('EEE')

    const entreprise = props.entreprise;
    const liste_clients_agences = Liste_clients_agences();
    const dictionnaireEntreprisesClients = Dictionnaire_entreprises_clients();

    // RECHERCHE DES CLIENTS DE L ENTREPRISE 

    const [liste_clients_de_l_entreprise, setListeClientsEntreprise] = useState([]);
    useEffect(() => {
        const optionTemp = [];
        for (let k = 0; k < liste_clients_agences.length; k++) {
          const client = liste_clients_agences[k];
          if (dictionnaireEntreprisesClients[props.entreprise].includes(client)) {
            optionTemp.push(client);
          }
        }
        setListeClientsEntreprise(optionTemp);
      }, [entreprise]);

    return (

        <div>
            <BarreRechercheClients entreprise={props.entreprise}/>
            <p className="newline"></p>
            {liste_clients_de_l_entreprise.map(client => <div><PetiteFiche entite={Retrouver_infos_clients(client)} /><p className="newline"></p></div>)}
<p className="newline"></p>
            <button className="rounded-button" onClick={() => ReactDOM.render(<App />, document.getElementById('root'))}> Retour au menu </button>
        </div>
    )
}

export default Entreprise;