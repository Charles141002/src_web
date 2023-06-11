import './App.css';
import React, { useState, useRef } from 'react';
import jsonData from './App_fichiers/fichier_csv';
import BarreRecherche from './App_fichiers/barre_de_recherche';
import { jsxOpeningElement } from '@babel/types';
import Menu from './App_fichiers/Menu_deroulant';


function App() {

  console.log(jsonData);

  const showFenetreGaucheRef = useRef(true);

  const [activePage, setActivePage] = useState('');

  const handleClick = (page) => {
    setActivePage(page);
  };

  const renderActivePage = () => {
    showFenetreGaucheRef.current = false;
    switch (activePage) {
      case 'afficherBarreRecherche':
        return <BarreRecherche donnees={jsonData}/>
      default:
        return null;
    }
  };


  return (

    <div className="container">
    <div className="menu">
      <button onClick={() => handleClick('afficherBarreRecherche')}>Afficher Barre de Recherche</button>
      <Menu datas={jsonData}/>
    </div>
    <div className="content">
      {renderActivePage()}
    </div>
  </div>
  );
}

export default App;
