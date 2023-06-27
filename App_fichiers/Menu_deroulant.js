import { useState , useEffect } from "react";
import { Liste_reseaux, Liste_entreprises, Liste_clients_agences, Dictionnaire_reseaux_entreprises, Dictionnaire_entreprises_clients, Retrouver_infos_clients } from "./liste.js";
import Reseau from "./reseau.js";
import ReactDOM from 'react-dom';
import Entreprise from "./entreprise.js";
import Fiche from "./Fiche_client.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faCircle, faBuilding} from '@fortawesome/free-solid-svg-icons';
import EviterBug from "./eviter_le bug.js";





function Menu2(props){


  const liste_reseaux = Liste_reseaux();
  const dictionnaireReseauxEntreprises = Dictionnaire_reseaux_entreprises();
  const liste_entreprises = Liste_entreprises();
  const liste_client_agences = Liste_clients_agences();
  const dictionnaireEntreprisesClients = Dictionnaire_entreprises_clients();

  const [entreprisesFiltrees, setEntreprisesFiltrees] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedReseau, setSelectedReseau] = useState("");


  const handleOnDoubleClickReseau = (reseau) => {
    if (reseau === selectedReseau && open) {
      setEntreprisesFiltrees([]);
      setOpen(false);
      
    } else {
      setEntreprisesFiltrees(liste_entreprises.filter(entreprise =>
        dictionnaireReseauxEntreprises[reseau].includes(entreprise))
      );
      setOpen(true);

    }
    setSelectedReseau(reseau);
  };



  const [clientsFiltrees, setClientsFiltrees] = useState([]);
  const [open_clients, setOpenClients] = useState(false);
  const [selectedEnterprise, setSelectedEnterprise] = useState("");

  const handleOnDoubleClickEntreprise = (entreprise) => {
    if (entreprise === selectedEnterprise && open_clients) {
      setClientsFiltrees([]);
      setOpenClients(false);
    } else {
      setClientsFiltrees(liste_client_agences.filter(client_agence =>
        dictionnaireEntreprisesClients[entreprise].includes(client_agence))
      );
      setOpenClients(true);

    }
    setSelectedEnterprise(entreprise);
  };

  function afficher(reseau){

    return <Reseau reseau={reseau}/>
  }



    return (

      <div id="menu-deroulant">
        {liste_reseaux.map(reseau => (
          <div key={reseau}>
            <div>
            <h1 onClick={() => handleOnDoubleClickReseau(reseau)} onDoubleClick={() => {
  const element = <Reseau reseau={reseau} />;
  ReactDOM.render(element, document.getElementById('root'));
}}><FontAwesomeIcon icon={faGlobe} /> {reseau} </h1>
            </div>
            {liste_entreprises.map(entreprise => {
              if (dictionnaireReseauxEntreprises[reseau].includes(entreprise) && entreprisesFiltrees.includes(entreprise) && open && selectedReseau==reseau) {
                return <div key={entreprise}><h2 onClick={() => handleOnDoubleClickEntreprise(entreprise)} onDoubleClick={() => {
                  const element = <Entreprise entreprise={entreprise} />;
                  ReactDOM.render(element, document.getElementById('root'));
                }}><FontAwesomeIcon icon={faBuilding} /> {entreprise}</h2>
                  {liste_client_agences.map(client_agence => {
                    if (dictionnaireEntreprisesClients[entreprise].includes(client_agence) && clientsFiltrees.includes(client_agence) && open) {
                      if (Retrouver_infos_clients(client_agence)["Nom"] && Retrouver_infos_clients(client_agence)["Prénom"]){
                      return <div key={client_agence}><h3 onClick={() => {
                        const element = <EviterBug entite={Retrouver_infos_clients(client_agence)} />;
                        ReactDOM.render(element, document.getElementById('root'));
                      }}><FontAwesomeIcon icon={faCircle} /> {Retrouver_infos_clients(client_agence)["Nom"]}{Retrouver_infos_clients(client_agence)["Prénom"]}</h3></div>;
                    } else {
                      return <div key={client_agence}><h3 onClick={() => {
                        const element = <EviterBug entite={Retrouver_infos_clients(client_agence)} />;
                        ReactDOM.render(element, document.getElementById('root'));
                      }}><FontAwesomeIcon icon={faCircle} /> {client_agence}</h3></div>;
                    }
                    } else {
                      return null;
                    }
                })}</div>;
              } else {
                return null;
              }
            })}
          </div>
        ))}

      </div>

);
}



export default Menu2;