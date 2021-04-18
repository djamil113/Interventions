import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailMatcherValidator } from '../shared/email-matcher.component';
import { ZonesValidator } from '../shared/longueur-minimum.component';
import { ITypeCategorie } from './categorie';
import { CategorieService } from './categorie.service';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  categoriesProblemes: ITypeCategorie[];
  errorMessage: string;

  constructor(private fb: FormBuilder, private categories: CategorieService) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
        probleme: ['', [ZonesValidator.longueurMinimum(3), Validators.required]],
        nom: ['', [Validators.maxLength(50), Validators.required]],
        typeCategorie: ['', [Validators.required]],

        noTypeProbleme: ['', Validators.required],
        courrielGroup: this.fb.group({
          courriel: [{value: '', disabled: true}],
          confirmerCourriel: [{value: '', disabled: true}],
        }),
        telephone: [{value: '', disabled: true}],
        noNotifications: [{value: 'aucune', disabled: false}]
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
    
  }

}
