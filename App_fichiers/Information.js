import { useState } from "react";


function Information (props) {
    

    const [value, setValue] = useState(props.value);
    const handleChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }
    
    

    return(
        <div class="bloc_info">
            <label for={props.name}>{props.name} :  </label>
            <input class="info" type="text" name={props.name} id={props.name} onChange={handleChange} value={value}/>
            
        </div>
    );
}


export default Information;