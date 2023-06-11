import React from 'react';
import Information from './Information';
import Fiche from './Fiche';
import App from '../App';

function PetiteFiche (props) {

    console.log(props.entite);

    function ey(){
        console.log('a');

        return (<Fiche entite={props.entite} />)  // il faudra surement ouvrir une page avec la grande fiche ça sera plus simple
    }

    return (
        <div>
        <button onClick={() => ey()}>
        <div class="fiche-petite">
            {Object.entries(props.entite).map((array) => <Information name={array[0]} value={array[1]}/>)}            
        </div>
        </button>
        </div>
    );
}



export default PetiteFiche;