import { useState, useEffect, useRef } from "react";
import BarreRechercheEntreprises from "./barre_recherche_entreprises";
import { Liste_entreprises, Dictionnaire_reseaux_entreprises } from "./liste";
import App from "../App";
import  ReactDOM  from "react-dom";
import jsonData from "./fichier_csv";
import VoirClientsReseau from "./voir_clients_reseau";
import Entreprise from "./entreprise";
import Menu2 from "./menu_deroulant";
import BarreRecherche from "./barre_de_recherche";

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

        <h1>{props.reseau}</h1>

      {renderActivePage()}
   
            <BarreRechercheEntreprises reseau={props.reseau}/>
            <button onClick={() =>ReactDOM.render(<VoirClientsReseau reseau={props.reseau}/>, document.getElementById('root'))}>Voir les clients de ce réseau</button>
            
            <div id="liste-reseau">
              {liste_entreprises_du_reseau.map(entreprise => <div><button className="rounded-button" onClick={() => ReactDOM.render(<Entreprise entreprise={entreprise} />, document.getElementById('root'))}>{entreprise}</button><p className="newline"></p></div>)}
            </div>

            <button className="rounded-button" onClick={() => ReactDOM.render(<App />, document.getElementById('root'))}> Retour au menu </button>
        </div>

        </div>

    )
}

export default Reseau;