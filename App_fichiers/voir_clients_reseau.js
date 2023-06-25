import { useState, useEffect, useRef } from "react";
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



function VoirClientsReseau(props){

    console.log('EEE')

    const reseau = props.reseau;
    const liste_entreprises = Liste_entreprises();
    const dictionnaireReseauxEntreprises = Dictionnaire_reseaux_entreprises();
    const liste_clients_agences = Liste_clients_agences();
    const dictionnaireEntreprisesClients = Dictionnaire_entreprises_clients();  

    const [liste_clients_du_reseau, setListeClientsDuReseau] = useState([]);
    useEffect(() => {
        const optionTemp = [];
        for (let k = 0; k < liste_entreprises.length; k++) {

          const entreprise = liste_entreprises[k];
          for (let i =0 ; i < liste_clients_agences.length; i++){
            const client = liste_clients_agences[i]
          if (dictionnaireReseauxEntreprises[props.reseau].includes(entreprise) && dictionnaireEntreprisesClients[entreprise].includes(client)) {
            optionTemp.push(client);
          }
        }
        }
        setListeClientsDuReseau(optionTemp);
      }, [reseau]);

      const [activePage, setActivePage] = useState('');

      const handleClick = (page) => {
        setActivePage(page);
      };
      const showFenetreGaucheRef = useRef(true);

      const renderActivePage = () => {
        showFenetreGaucheRef.current = false;
        switch (activePage) {
          case 'afficherBarreRecherche':
            return <BarreRecherche donnees={jsonData}/>
          default:
            return null;
        }
      };

    

    return (
      <div className="container">
    <div id="menu">
      <button onClick={() => handleClick('afficherBarreRecherche')}>Afficher Barre de Recherche</button>
      <Menu2 datas={jsonData}/>
      
    </div>
    <div id="content">
      {renderActivePage()}
              <BarreRechercheClientsReseau reseau={props.reseau}/>
              <p className="newline"></p>

            {liste_clients_du_reseau.map(client => <div><PetiteFiche entite={Retrouver_infos_clients(client)} /><p className="newline"></p></div>)}
<p className="newline"></p>
            <button className="rounded-button" onClick={() => ReactDOM.render(<App />, document.getElementById('root'))}> Retour au menu </button>
        </div>
    
  </div>

        
    )
}

export default VoirClientsReseau;



