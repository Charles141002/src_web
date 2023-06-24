import {useState, useEffect} from "react";
import jsonData from "./fichier_csv";
import { Liste_reseaux, Liste_clients_agences, Dictionnaire_entreprises_clients, Liste_entreprises, Dictionnaire_reseaux_entreprises } from "./liste";


function BarreRechercheClientsReseau(props){

    const dictionnaireEntreprisesClients = Dictionnaire_entreprises_clients();
    const dictionnaireReseauxEntreprises = Dictionnaire_reseaux_entreprises();

    console.log(dictionnaireReseauxEntreprises[props.reseau]);

    const liste_client_agences = Liste_clients_agences();
    const liste_entreprises = Liste_entreprises();

    const [tableauClients, setTableauClients] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {

        const optionTemp = [];
    
        for (let k = 0; k <  liste_entreprises.length; k++) {

            
            const entreprise = liste_entreprises[k];

            for (let i=0; i< liste_client_agences.length; i++){

                const client_agence = liste_client_agences[k];

    
            if (!optionTemp.includes(client_agence)  && dictionnaireEntreprisesClients[entreprise].includes(client_agence) && dictionnaireReseauxEntreprises[props.reseau].includes(entreprise)){
              optionTemp.push(client_agence);
                }
          
        }
    }
    
        setOptions(optionTemp);
      }, []);

    
    
    const FindObject = (e) => {

        e.preventDefault();

        const RechercheData = document.getElementById('recherche-client').value;
        const clientsagencesTrouves = [];
        const optionTemp = [];

        for ( let k =0; k < liste_entreprises.length; k++){

            const entreprise = liste_entreprises[k];



                for (let i =0; i<liste_client_agences.length; i++){

                    const client_agence = liste_client_agences[k];



                    if (RechercheData === client_agence  && dictionnaireEntreprisesClients[entreprise].includes(client_agence) && dictionnaireReseauxEntreprises[props.reseau].includes(entreprise)) {
                        clientsagencesTrouves.push(client_agence);


                    

                }
                
            }
                
            }
            
        //setTableauFiches([]);
        //console.log(tableauFiches)
        setTableauClients(clientsagencesTrouves);

    };


    const handleSearch = () => {
        setTableauClients([]);
      };
      

    return (

        <div>
            <input type="text" list="suggestions" id="recherche-client"/>
            <datalist id="suggestions">
            {options.map((option, index) => (<option key={index} value={option} />))}
            </datalist>
            <p className="newline"></p>
            <button className="rounded-button" onClick={FindObject}>Recherche</button>
            <p className="newline"></p>
        <div>
            {tableauClients.map( mail_client => (<div>{mail_client}<p className="newline"></p></div>))}
        </div>
        </div>
    );

}

export default BarreRechercheClientsReseau;