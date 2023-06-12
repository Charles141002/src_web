import React from 'react';
import Information from './Information';
import Fiche from './Fiche';
import App from '../App';
import { useState } from 'react';




function PetiteFiche (props) {

    const [ouvrirFichebool, setouvrirFichebool] = useState(false);

    
    console.log(props.entite);

    function ouvrirFiche(){
        console.log('a');
    
        setouvrirFichebool(true);
    }
    


    if (ouvrirFichebool)
{
    return (<div>
        <Fiche entite={props.entite} />
    </div>)
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