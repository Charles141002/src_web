import { useState , useEffect } from "react";
import { Liste_reseaux, Liste_entreprises, Liste_clients_agences, Dictionnaire_reseaux_entreprises, Dictionnaire_entreprises_clients } from "./liste.js";
import Reseau from "./reseau.js";
import { ReactDOM } from "react-dom";




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

  const [ouvrirFichebool, setouvrirFichebool] = useState(false);
  const [FICHE, setFiche] = useState('');



  function ouvrirFiche(reseau){

    setouvrirFichebool(true);
    setFiche(reseau);
}



if (ouvrirFichebool)
{
  const res = FICHE;

ReactDOM.render(<Reseau reseau={FICHE} />, document.getElementById('root'));
}

    return (

      <div>
        {liste_reseaux.map(reseau => (
          <div key={reseau}>
            <button onDoubleClick={() => handleOnDoubleClickReseau(reseau)} onClick={() => ouvrirFiche(reseau)}>{reseau}</button>
            {liste_entreprises.map(entreprise => {
              if (dictionnaireReseauxEntreprises[reseau].includes(entreprise) && entreprisesFiltrees.includes(entreprise) && open) {
                return <div key={entreprise}><button onDoubleClick={() => handleOnDoubleClickEntreprise(entreprise)}>{entreprise}</button>
                  {liste_client_agences.map(client_agence => {
                    if (dictionnaireEntreprisesClients[entreprise].includes(client_agence) && clientsFiltrees.includes(client_agence) && open) {
                      return <div key={client_agence}><button>{client_agence}</button></div>;
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





