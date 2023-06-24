import jsonData from "./fichier_csv";
import { Liste_reseaux, Liste_clients_agences, Dictionnaire_entreprises_clients, Liste_entreprises, Dictionnaire_reseaux_entreprises } from "./liste";
import {useState} from 'react';
import {useEffect} from 'react';
import PetiteFiche from './Petite_fiche';

function BarreRecherche (props) {




    const [tableauFiches, setTableauFiches] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const optionTemp = [];
    
        for (let k = 0; k < jsonData.length; k++) {

            
            const ligne = jsonData[k];

            if (props.reseau == Object.entries(ligne)[1][1]) {
    
            for (let j = 0; j < Object.entries(ligne).length; j++) {
                if (!optionTemp.includes(Object.entries(ligne)[j][1])){
              optionTemp.push(Object.entries(ligne)[j][1]);
                }
            }
        }
          
        }
    
        setOptions(optionTemp);
      }, [jsonData]);

      console.log(options);
    
    
    const FindObject = (e) => {

        e.preventDefault();

        const RechercheData = document.getElementById('recherche-nom').value;
        const fichesTrouvees = [];
        const optionTemp = [];

        for ( let k =0; k < jsonData.length; k++){

                const ligne = jsonData[k];


                for (let j=0; j<Object.entries(ligne).length; j++) {
                    if (RechercheData === Object.entries(ligne)[j][1] && props.reseau == Object.entries(ligne)[1][1]) {
                        fichesTrouvees.push(ligne);


                    }

                }

                
            }
            
        //setTableauFiches([]);
        //console.log(tableauFiches)
        setTableauFiches(fichesTrouvees);

    };

    console.log(tableauFiches);

    const handleSearch = () => {
        setTableauFiches([]);
      };
      

    return (

        <div>
            <input type="text" list="suggestions" id="recherche-nom"/>
            <datalist id="suggestions">
                {options.map((option, index) => (<option key={index} value={option} />))}
            </datalist>
            <p className="newline"></p>
            <button className="rounded-button" onClick={FindObject}>Recherche</button>
            <p className="newline"></p>
            <button className="rounded-button" onClick={handleSearch}>Reinitialiser</button>
            <p className="newline"></p>
        <div>
            {tableauFiches.map((fiche, index) => (<div><PetiteFiche key={index} entite={fiche} /><p className="newline"></p></div>))}
        </div>
        </div>
    );


}

export default BarreRecherche;