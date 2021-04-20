import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get('/probleme');
  }

  async getTitleText(): Promise<string> {
    return element(by.css('inter-root h5')).getText();
  }

   // Permet de vider toutes les zones.  A appeller dans chaque test.
   async viderToutesLesZones() : Promise<void> {
    element(by.id('prenomId')).clear();  
    element(by.id('nomId')).clear();
   // Sélectionner le premier élément dans la zone de liste déroulante (Sélectionner un type de problème (obligatoire))
    await element(by.id('typeProblemeId')).all(by.tagName('option')).get(0).click();      
    // Cliquer sur le bouton radio par défaut (Pas de notification)
    element.all(by.id('typeNotificationsId')).get(0).click();
    element(by.id('courrielId')).clear();
    element(by.id('courrielConfirmationId')).clear();   
    element(by.id('telephoneId')).clear();       
    element(by.id('noUniteId')).clear();
    element(by.id('descriptionProblemeId')).clear();     
   }

   // Inscrire tous les renseignements obligatoires pour le scénario de base HAPPY PATH (saisie minimum obligatoire pour rendre le formulaire valide)
  async setChampsValidesScenarioNominal() : Promise<void> {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');    
    // Sélectionner le X élément dans la zone de liste déroulante
    await element(by.id('typeProblemeId')).all(by.tagName('option')).get(2).click();      
    // Cliquer sur le bouton radio voulu
    element.all(by.id('typeNotificationsId')).get(0).click();  
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  // Inscrire tous les renseignements obligatoires pour le scénario alternatif Par message TEXTE
  async setChampsValidesScenarioAlternatifParMessageTexte() : Promise<void> {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');    
    // Sélectionner le X élément dans la zone de liste déroulante
    await element(by.id('typeProblemeId')).all(by.tagName('option')).get(3).click();      
    // Cliquer sur le bouton radio voulu
    element.all(by.id('typeNotificationsId')).get(2).click();  
    element(by.id('telephoneId')).sendKeys('5141234567');
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  // Inscrire tous les renseignements obligatoires pour le scénario alternatif Par courriel
  async setChampsValidesScenarioAlternatifParCourriel() : Promise<void> {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');    
    // Sélectionner le X élément dans la zone de liste déroulante
    await element(by.id('typeProblemeId')).all(by.tagName('option')).get(4).click();      
    // Cliquer sur le bouton radio voulu
    element.all(by.id('typeNotificationsId')).get(1).click();  
    element(by.id('courrielId')).sendKeys('test@abc.com');
    element(by.id('courrielConfirmationId')).sendKeys('test@abc.com');
    element(by.id('descriptionProblemeId')).sendKeys('Problème d\'installation du système d\'exploitation...');
  }

  async setZoneDescriptionProblemeCaracteresSuffisants() : Promise<void> {
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('XXXXX');
  }

  async setZoneDescriptionProblemeCaracteresInsuffisants() : Promise<void> {
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('XX');
  }

  obtenirClasseZoneDescriptionProbleme(){
    return element(by.id('descriptionProblemeId')).getAttribute("class");
  }

  // Permet d'obtenir toutes les propriétés et leurs valeurs du bouton Sauvegarder
  boutonSubmit() : ElementFinder { 
    return element(by.buttonText('Sauvegarder'));
  }  
}