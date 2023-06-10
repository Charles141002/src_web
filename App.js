import './App.css';
import jsonData from './App_fichiers/fichier_csv';
import BarreRecherche from './App_fichiers/barre_de_recherche';
import { jsxOpeningElement } from '@babel/types';

function App() {


  return (
    <div className="App">
      <BarreRecherche donnees={jsonData}/>
      {jsonData.map((data, index) => (
        <div key={index}>
          <p>Société: {data.Société}</p>
          <p>Réseau: {data.Réseau}</p>
          <p>Genre: {data.Genre}</p>
          <p>Nom: {data.Nom}</p>
          <p>Prénom: {data.Prénom}</p>
          <p>Adresse e-mail: {data["Adresse e-mail"]}</p>
          <p>Ville: {data.Ville}</p>
          <p>Code postal: {data["Code postal"]}</p>
          <p>Pays/région: {data["Pays/région"]}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
