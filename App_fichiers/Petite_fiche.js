import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import EviterBug from './eviter_le bug';






function PetiteFiche (props) {

    const [ouvrirFichebool, setouvrirFichebool] = useState(false);

    
    

    function ouvrirFiche(){
    
        setouvrirFichebool(true);
    }
    


    if (ouvrirFichebool)
{
    ReactDOM.render(<EviterBug entite={props.entite} />, document.getElementById('root'));
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