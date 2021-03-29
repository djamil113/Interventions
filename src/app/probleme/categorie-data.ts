import { ITypeCategorie } from './categorie';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { InMemoryBackendConfig } from 'angular-in-memory-web-api';

export class CategorieData implements InMemoryDbService, InMemoryBackendConfig {
    createDb() {
        let categories: ITypeCategorie[] = [
            {
                'id': 1,
                'descriptionCategorie': 'Problème avec la souris'
            },
            {
                'id': 2,
                'descriptionCategorie': 'Problème de clavier'
            },
            {
                'id': 3,
                'descriptionCategorie': 'Problème d\'accès Internet'
            },
            {
                'id': 4,
                'descriptionCategorie': 'Problème avec un logiciel'
            },
            {
                'id': 5,
                'descriptionCategorie': 'Problème d\'imprimante'
            },
            {
                'id': 6,
                'descriptionCategorie': 'Carte graphique'
            },
            {
                'id': 7,
                'descriptionCategorie': 'Carte mère'
            },
            {
                'id': 8,
                'descriptionCategorie': 'Autre'
            }
        ];
        return {categories};        
    }
}