import { useState } from "react";
import Entreprise from "./entreprise";
import root from "root";
import Reseau from "./reseau";
import ReactDOM from "react-dom";

function Information (props) {
    

    const [value, setValue] = useState(props.value);
    const handleChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }

    const buttonNav = () => {
        if (props.name == '﻿Société') {
            return  (<button onClick={() => {ReactDOM.render(<Entreprise entreprise={props.value}/>, document.getElementById('root')) }}>Voir</button>)
        } else if (props.name == "Réseau") {
            return (<button onClick={() => {ReactDOM.render(<Reseau reseau={props.value}/>, document.getElementById('root')) }}>Voir</button>)
        } else {
            return null
        }
    }
    
    if (props.name == "Informations quelconques") {
        return (
            <div >
            <label for={props.name}>{props.name}   </label>
            <textarea class="info" type="text" name={props.name} id={props.name} onChange={handleChange} value={value}></textarea>



        </div>
        )
    } else {
        return(
            <div>
                <label for={props.name}>{props.name}   </label>
                <div className="input-button">
                <input class="info" type="text" name={props.name} id={props.name} onChange={handleChange} value={value}/>
                {buttonNav()}
                </div>
            </div>
        );
    }
    

    
}


export default Information;