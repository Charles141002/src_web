import React from 'react';
import Information from './Information';
import Fiche from './Fiche_client';
import App from '../App';
import { useState } from 'react';
import root from 'root';
import ReactDOM from 'react-dom';






function PetiteFiche (props) {
    console.log(props.entite)
    console.log(props.entite.Nom);
    console.log(props.entite.Prénom);
    console.log(props.entite.Ville);
    const [ouvrirFichebool, setouvrirFichebool] = useState(false);

    
    

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
        <div style={{margin: "0px", border: "0px", padding: "0px"}}>
            {(props.entite.Nom=="") ?  
            <div class="petite-fiche" onClick={() => ouvrirFiche()}><p>Agence {props.entite.Ville}</p> </div>:
            <div class="petite-fiche" onClick={() => ouvrirFiche()}><p>{props.entite.Nom}  </p> <p>  {props.entite.Prénom}</p></div>}         
        </div>
        
            
        
    );
}
}




export default PetiteFiche;