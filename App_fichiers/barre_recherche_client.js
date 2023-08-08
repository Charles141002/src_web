import {useState, useEffect} from "react";
import { Liste_clients_agences, Dictionnaire_entreprises_clients } from "./liste";


function BarreRechercheClients(props){

    const dictionnaireEntreprisesClients = Dictionnaire_entreprises_clients();

    const liste_client_agences = Liste_clients_agences();

    const [tableauClients, setTableauClients] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {

        const optionTemp = [];
    
        for (let k = 0; k < liste_client_agences.length; k++) {

            
            const client_agence = liste_client_agences[k];

    
            if (!optionTemp.includes(client_agence) && dictionnaireEntreprisesClients[props.entreprise].includes(client_agence)){
              optionTemp.push(client_agence);
                }
          
        }
    
        setOptions(optionTemp);
      }, []);

    
    
    const FindObject = (e) => {

        e.preventDefault();

        const RechercheData = document.getElementById('recherche-client').value;
        const clientsagencesTrouves = [];
        const optionTemp = [];

        for ( let k =0; k < liste_client_agences.length; k++){

                const client_agence = liste_client_agences[k];



                    if (RechercheData === client_agence && dictionnaireEntreprisesClients[props.entreprise].includes(client_agence)) {
                        clientsagencesTrouves.push(client_agence);


                    

                }

                
            }
            
        //setTableauFiches([]);
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

export default BarreRechercheClients;