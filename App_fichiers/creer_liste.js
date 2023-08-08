import { useState, useEffect } from 'react';


function CreerListe(props) {
  const [reseaux, setReseaux] = useState([]); // État pour stocker les réseaux
  const [entreprises, setEntreprises] = useState([]); // État pour stocker les entreprises correspondantes
  const [clients, setClients] = useState([]); // État pour stocker les clients des entreprises

  useEffect(() => {
    const reseaux = trouverReseaux(props);
    setReseaux(reseaux);
  }, [props]);

  const handleSelectionReseau = (reseau) => {
    const entreprises = dictionnaireReseauxEntreprises[reseau] || [];
    setEntreprises(entreprises);
  };

  const dictionnaireReseauxEntreprises = creerDictionnaireReseauxEntreprises(props);
  const dictionnaireEntreprisesClients = creerDictionnaireEntreprisesClients(props);

  // TROUVER LES RESEAUX
  function trouverReseaux(tableauDonnees) {
    const reseaux = new Set(); // Utilisation d'un Set pour éliminer les doublons

    tableauDonnees.forEach((ligne) => {
      const reseau = ligne.Réseau;
      if (reseau) {
        reseaux.add(reseau);
      }
    });

    const reseauxTries = Array.from(reseaux).sort(); // Tri des réseaux par ordre alphabétique
    return reseauxTries;
  }

  // TROUVER LES ENTREPRISES CORRESPONDANTES AUX RESEAUX
  function creerDictionnaireReseauxEntreprises(tableauDonnees) {
    const dictionnaire = {};

    tableauDonnees.forEach((ligne) => {
      const reseau = ligne.Réseau;
      const entreprise = ligne["Société"];

      if (reseau && entreprise) {
        if (!dictionnaire[reseau]) {
          dictionnaire[reseau] = new Set();
        }
        dictionnaire[reseau].add(entreprise);
      }
    });

    // Tri des entreprises par ordre alphabétique
    for (const reseau in dictionnaire) {
      dictionnaire[reseau] = Array.from(dictionnaire[reseau]).sort();
    }

    return dictionnaire;
  }

  // TROUVER LES ENTREPRISES CORRESPONDANTES AUX CLIENTS
  function creerDictionnaireEntreprisesClients(tableauDonnees) {
    const dictionnaire = {};

    tableauDonnees.forEach((ligne) => {
      const entreprise = ligne["Société"];
      const client = ligne["Nom"];

      if (client && entreprise) {
        if (!dictionnaire[entreprise]) {
          dictionnaire[entreprise] = [];
        }
        dictionnaire[entreprise].push(client);
      }
    });

    // Tri des entreprises par ordre alphabétique
    for (const entreprise in dictionnaire) {
      dictionnaire[entreprise].sort();
    }

    return dictionnaire;
  }

  return [dictionnaireReseauxEntreprises, dictionnaireEntreprisesClients]; // Remplacez null par le contenu JSX que vous souhaitez rendre
}

export default CreerListe;
