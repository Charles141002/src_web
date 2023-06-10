import React, { useState } from 'react';
import Information from './Information';
import jsonData from './fichier_csv';
import App from '../App';

function Fiche(props) {
  const [data, setData] = useState(jsonData);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Mise à jour des données avec les nouvelles valeurs
    const updatedData = { ...data };
    Object.entries(props.entite).forEach(([key, value]) => {
      updatedData[props.entite.__rowNum__][key] = document.getElementById(key).value;
    });
    setData(updatedData);

    // Enregistrement des données au format JSON (facultatif)
    const jsonDataStr = JSON.stringify(updatedData);
    // Faites ce que vous souhaitez avec les données JSON mises à jour

    // Par exemple, vous pouvez télécharger le fichier JSON
    const blob = new Blob([jsonDataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fichier_json.json';
    link.click();
  };

  return (
    <div className="fiche">
      <form className="fiche-modifiable" onSubmit={handleSubmit}>
        {Object.entries(props.entite).map(([key, value]) => (
          <Information key={key} name={key} value={value} line={props.entite.__rowNum__} />
        ))}
        <input type="submit" value="Sauvegarder" />
      </form>
      <button className="rounded-button" onClick={() => <App />}>
        Retour au menu
      </button>
    </div>
  );
}

export default Fiche;
