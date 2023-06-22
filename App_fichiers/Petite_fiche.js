import React from 'react';
import Information from './Information';
import Fiche from './Fiche_client';
import App from '../App';
import { useState } from 'react';
import root from 'root';
import ReactDOM from 'react-dom';






function PetiteFiche (props) {

    const [ouvrirFichebool, setouvrirFichebool] = useState(false);

    
    console.log(props);

    function ouvrirFiche(){
        console.log('a');
    
        setouvrirFichebool(true);
    }
    


    if (ouvrirFichebool)
{
    ReactDOM.render(<Fiche entite={props.entite} />, document.getElementById('root'));
}
    else{
    return (
        <div>
        <button className= "rounded-button" onClick={() => ouvrirFiche()}>
        <div class="fiche-petite">
            {Object.entries(props.entite).map((array) => <Information name={array[0]} value={array[1]}/>)}            
        </div>
        </button>
        </div>
    );
}
}




export default PetiteFiche;