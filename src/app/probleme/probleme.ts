export interface IProbleme {
    id: number;
    prenom: string,
    nom: string,
    noTypeProbleme?: number,
    courriel?: string,
    //courrielConfirmation?: string,
    telephone?: string,        
    notification: string,
    noUnite?: string,
    descriptionCategorie: string
    //dateProbleme?: Date
}