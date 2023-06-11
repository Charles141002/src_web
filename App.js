import './App.css';
import jsonData from './App_fichiers/fichier_csv';
import BarreRecherche from './App_fichiers/barre_de_recherche';
import { jsxOpeningElement } from '@babel/types';

function App() {


  return (
    <div className="App">
      <BarreRecherche donnees={jsonData}/>
    </div>
  );
}

export default App;
