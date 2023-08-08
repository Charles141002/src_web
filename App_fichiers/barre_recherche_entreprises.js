import {useState, useEffect} from "react";
import { Liste_entreprises, Dictionnaire_reseaux_entreprises } from "./liste";
import ReactDOM from "react-dom";
import Entreprise from "./entreprise";


function BarreRechercheEntreprises(props){

    const dictionnaireReseauxEntreprises = Dictionnaire_reseaux_entreprises();

    const liste_entreprises = Liste_entreprises();

    const [tableauEntreprises, setTableauEntreprises] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {

        const optionTemp = [];
    
        for (let k = 0; k < liste_entreprises.length; k++) {

            
            const entreprise = liste_entreprises[k];

    
            if (!optionTemp.includes(entreprise) && dictionnaireReseauxEntreprises[props.reseau].includes(entreprise)){
              optionTemp.push(entreprise);
                }
          
        }
    
        setOptions(optionTemp);
      }, []);

    
    
    const FindObject = (e) => {

        e.preventDefault();

        const RechercheData = document.getElementById('recherche-entreprise').value;
        const entreprisesTrouvees = [];
        const optionTemp = [];

        for ( let k =0; k < liste_entreprises.length; k++){

                const entreprise = liste_entreprises[k];



                    if (RechercheData === entreprise && dictionnaireReseauxEntreprises[props.reseau].includes(entreprise)) {
                        entreprisesTrouvees.push(entreprise);


                    

                }

                
            }
            
        //setTableauFiches([]);
        setTableauEntreprises(entreprisesTrouvees);

    };


    const handleSearch = () => {
        setTableauEntreprises([]);
      };
      

    return (

        <div>
            <input type="text" list="suggestions" id="recherche-entreprise"/>
            <datalist id="suggestions">
            {options.map((option, index) => (<option key={index} value={option} />))}
            </datalist>
            <p className="newline"></p>
            <button className="rounded-button" onClick={FindObject}>Recherche</button>
            <p className="newline"></p>
        <div>
            {tableauEntreprises.map( nom_entreprise => (<div><button className="rounded-button" onClick={() => ReactDOM.render(<Entreprise entreprise={nom_entreprise} />, document.getElementById('root'))}>{nom_entreprise}</button><p className="newline"></p></div>))}
        </div>
        </div>
    );

}

export default BarreRechercheEntreprises;