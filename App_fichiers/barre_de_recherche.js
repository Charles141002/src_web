import {useState} from 'react';
import {useEffect} from 'react';
import Fiche from './Fiche';

function BarreRecherche (donnees) {




    const [tableauFiches, setTableauFiches] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const optionTemp = [];
    
        for (let k = 0; k < donnees.donnees.length; k++) {

            
            const ligne = donnees.donnees[k];

    
            for (let j = 0; j < Object.entries(ligne).length; j++) {
                if (!optionTemp.includes(Object.entries(ligne)[j][1])){
              optionTemp.push(Object.entries(ligne)[j][1]);
                }
            }
          
        }
    
        setOptions(optionTemp);
      }, [donnees.donnees]);

    
    
    const FindObject = (e) => {

        e.preventDefault();

        const RechercheData = document.getElementById('recherche-nom').value;
        const fichesTrouvees = [];
        const optionTemp = [];

        for ( let k =0; k < donnees.donnees.length; k++){

                const ligne = donnees.donnees[k];


                for (let j=0; j<Object.entries(ligne).length; j++) {
                    if (RechercheData === Object.entries(ligne)[j][1]) {
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
            <button className="rounded-button" onClick={handleSearch}>Reinitialiser</button>

        <div>
            {tableauFiches.map((fiche, index) => (<Fiche key={index} entite={fiche} />))}
        </div>
        </div>
    );
}

export default BarreRecherche;