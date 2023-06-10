import logo from './logo.svg';
import './App.css';
import workbook from './App_fichiers/fichier_csv';

function App() {

  // Convertir la feuille de calcul en un tableau JSON
  const jsonData = XLSX.utils.sheet_to_json(workbook, { header: 1 });

  console.table(jsonData);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React 2
        </a>
      </header>
    </div>
  );
}

export default App;
