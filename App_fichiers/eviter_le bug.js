import Fiche from "./Fiche_client";
import  ReactDOM from "react-dom";

function EviterBug(props){

    ReactDOM.render(<Fiche entite={props.entite} />, document.getElementById('root'));




    return (
        <div>

        </div>
    )


}

export default EviterBug;