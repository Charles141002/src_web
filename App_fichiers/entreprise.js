import { useState, useEffect, useRef } from "react";
import { Liste_clients_agences, Dictionnaire_entreprises_clients } from "./liste";
import App from "../App";
import  ReactDOM  from "react-dom";
import BarreRechercheClients from "./barre_recherche_client";
import PetiteFiche from "./Petite_fiche";
import { Retrouver_infos_clients } from "./liste";
import Menu2 from "./menu_deroulant";
import BarreRecherche from "./barre_de_recherche";
import jsonData from "./fichier_csv";
import { AjoutClient } from "./ajout_client";

function Entreprise(props){

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

    return (

      <div className="container">
    <div id="menu">
      <button onClick={() => handleClick('afficherBarreRecherche')}>Afficher Barre de Recherche</button>
      <button onClick={() => handleClick('afficherAjoutlient')}> Ajout Client</button>

      <Menu2 datas={jsonData}/>
      
    </div>

      <div id="content">
      <h1>{props.entreprise}</h1>
      {renderActivePage()}
            <BarreRechercheClients entreprise={props.entreprise}/>
            
            {liste_clients_de_l_entreprise.map(client => <PetiteFiche entite={Retrouver_infos_clients(client)} />)}
<p className="newline"></p>
            <button className="rounded-button" onClick={() => ReactDOM.render(<App />, document.getElementById('root'))}> Retour au menu </button>
        </div>
        </div>
    )
}

export default Entreprise;