import './App.css';
import React, { useState, useRef } from 'react';
import jsonData from './App_fichiers/fichier_csv';
import BarreRecherche from './App_fichiers/barre_de_recherche';
import { jsxOpeningElement } from '@babel/types';
import Menu from './App_fichiers/menu_deroulant';
import CreerListe from './App_fichiers/creer_liste';
import { Liste_reseaux, Liste_entreprises, Liste_clients_agences } from './App_fichiers/liste';
import BarreRechercheEntreprises from './App_fichiers/barre_recherche_entreprises';
import BarreRechercheClients from './App_fichiers/barre_recherche_client';
import Reseau from './App_fichiers/reseau';
import VoirClientsReseau from './App_fichiers/voir_clients_reseau';

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
