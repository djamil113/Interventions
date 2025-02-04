import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailMatcherValidator } from '../shared/email-matcher.component';
import { ZonesValidator } from '../shared/longueur-minimum.component';
import { ITypeCategorie } from './categorie';
import { CategorieService } from './categorie.service';
import { ProblemeService } from './probleme.service';
import { Router } from '@angular/router';
import { IProbleme } from './probleme';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  categoriesProblemes: ITypeCategorie[];
  errorMessage: string;

  probleme: IProbleme;

  constructor(private fb: FormBuilder, private categories: CategorieService, private problemeService: ProblemeService, private route : Router) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
        prenom: ['', [ZonesValidator.longueurMinimum(3), Validators.required]],
        nom: ['', [Validators.maxLength(50), Validators.required]],
        typeCategorie: ['', [Validators.required]],
        courrielGroup: this.fb.group({
          courriel: [{value: '', disabled: true}],
          confirmerCourriel: [{value: '', disabled: true}],
        }),
        telephone: [{value: '', disabled: true}],
        noNotifications: [{value: 'aucune', disabled: false}],
        descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]], 
        noUnite: '',
        dateProbleme: {value: Date(), disabled: true}
    });

    this.categories.obtenirCategories()
    .subscribe(cat => this.categoriesProblemes = cat,
               error => this.errorMessage = <any>error);  

     this.problemeForm.get('noNotifications').valueChanges
     .subscribe(value => this.appliquerNotifications(value));
  }

  appliquerNotifications(typeNotifications: string): void {
    const telephoneControl = this.problemeForm.get('telephone');   
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');   
    const confirmerCourrielControl = this.problemeForm.get('courrielGroup.confirmerCourriel');
    const courrielGroupControl = this.problemeForm.get('courrielGroup');

    // Tous remettre à zéro
    telephoneControl.clearValidators();
    telephoneControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invalides
    telephoneControl.disable();

    courrielControl.clearValidators();
    courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invalides
    courrielControl.disable();

    confirmerCourrielControl.clearValidators();
    confirmerCourrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invalides
    confirmerCourrielControl.disable();

    if (typeNotifications === 'courriel'){
      courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielControl.enable();
      confirmerCourrielControl.setValidators([Validators.required]);
      confirmerCourrielControl.enable();
      courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);
    }

    if (typeNotifications === 'telephone'){
      telephoneControl.enable();
      telephoneControl.setValidators([Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)]);
    }
    
    telephoneControl.updateValueAndValidity();  
    courrielControl.updateValueAndValidity(); 
    confirmerCourrielControl.updateValueAndValidity(); 
    courrielGroupControl.updateValueAndValidity();
  }

  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
        // Copy the form values over the problem object values
        this.probleme = this.problemeForm.value;
        this.probleme.id = 0;
        if (this.problemeForm.get('courrielGroup.courriel').value != "")
        {
          this.probleme.courriel = this.problemeForm.get('courrielGroup.courriel').value;
        }
        //this.probleme.dateProbleme = new Date();
        this.problemeService.saveProbleme(this.probleme)
            .subscribe( // on s'abonne car on a un retour du serveur à un moment donné avec la callback fonction
                () => this.onSaveComplete(),  // Fonction callback
                (error: any) => this.errorMessage = <any>error
            );
    } else if (!this.problemeForm.dirty) {
        this.onSaveComplete();
    }
  }
  
  onSaveComplete(): void { 
    // Reset the form to clear the flags
    this.problemeForm.reset();  // Pour remettre Dirty à false. Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.route.navigate(['/accueil']);
  }

}
