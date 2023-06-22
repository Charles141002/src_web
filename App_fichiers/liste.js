import { useState} from "react";
import jsonData from "./fichier_csv"


// ON RECUPERE LA LISTE DES RESEAUX


export function Liste_reseaux(){


    const reseaux = trouverReseaux(jsonData);


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
    console.log(reseaux);

    return reseaux;

}


// ON RECUPERE LA LISTE DES ENTREPRISES


export function Liste_entreprises(){


    const entreprises = trouverEntreprises(jsonData);


    function trouverEntreprises(tableauDonnees) {
        const entreprises = new Set(); // Utilisation d'un Set pour éliminer les doublons
        
        tableauDonnees.forEach((ligne) => {
        const entreprise = ligne["﻿Société"];
        if (entreprise) {
            entreprises.add(entreprise);
        }
        });
        
        const entreprisesTries = Array.from(entreprises).sort(); // Tri des réseaux par ordre alphabétique
        return entreprisesTries;

    }

    return entreprises;

}


// ON RECUPERE LA LISTE DES CLIENTS ET DES AGENCES --> LEUR ADRESSE MAIL


export function Liste_clients_agences(){


    const clients_agences = trouverClientsAgences(jsonData);


    function trouverClientsAgences(tableauDonnees) {
        const clients_agences = new Set(); // Utilisation d'un Set pour éliminer les doublons
        
        tableauDonnees.forEach((ligne) => {
        const client_agence = ligne["Adresse e-mail"];
        if (client_agence) {
            clients_agences.add(client_agence);
        }
        });
        
        const clients_agencesTries = Array.from(clients_agences).sort(); // Tri des réseaux par ordre alphabétique
        return clients_agencesTries;

    }
    console.log(clients_agences);

    return clients_agences;

}


// ON RECUPERE LE LIEN ENTRE LES RESEAUX ET LES ENTREPRISES QUI LEUR SONT ASSOCIEES --> SOUS FORME DE DICTIONNAIRE


export function Dictionnaire_reseaux_entreprises(){

    const dictionnaireReseauxEntreprises = creerDictionnaireReseauxEntreprises(jsonData);

    function creerDictionnaireReseauxEntreprises(tableauDonnees) {
        const dictionnaire = {};
    
        tableauDonnees.forEach((ligne) => {
        const reseau = ligne.Réseau;
        const entreprise = ligne["﻿Société"];
    
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

    return dictionnaireReseauxEntreprises;

}


// ON RECUPERE LE LIEN ENTRE LES ENTREPRISES ET LES RESEAUX QUI LEUR SONT ASSOCIEES --> SOUS FORME DE DICTIONNAIRE


export function Dictionnaire_entreprises_clients(){

    const dictionnaireEntreprisesClients = creerDictionnaireEntreprisesClients(jsonData);

    function creerDictionnaireEntreprisesClients(tableauDonnees) {
        const dictionnaire = {};
    
        tableauDonnees.forEach((ligne) => {
        const entreprise = ligne["﻿Société"];
        const mail = ligne["Adresse e-mail"];
    
        if (mail && entreprise) {
            if (!dictionnaire[entreprise]) {
            dictionnaire[entreprise] = new Set();
            }
            dictionnaire[entreprise].add(mail);
        }
        });
    
        // Tri des entreprises par ordre alphabétique
        for (const entreprise in dictionnaire) {
        dictionnaire[entreprise] = Array.from(dictionnaire[entreprise]).sort();
        }
    
        return dictionnaire;
    }

    return dictionnaireEntreprisesClients;

}