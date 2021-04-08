import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        telephone: [{value: '', disabled: true}]
    });

    this.categories.obtenirCategories()
    .subscribe(cat => this.categoriesProblemes = cat,
               error => this.errorMessage = <any>error);  
  }

  //appliquerNotifications(typeNotifications: string): void {
  appliquerNotifications(): void {
    const telephoneControl = this.problemeForm.get('telephone');   
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');   
    const confirmerCourrielControl = this.problemeForm.get('courrielGroup.confirmerCourriel');   

    // Tous remettre à zéro
    telephoneControl.clearValidators();
    telephoneControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    telephoneControl.disable();

    courrielControl.clearValidators();
    courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielControl.disable();

    confirmerCourrielControl.clearValidators();
    confirmerCourrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    confirmerCourrielControl.disable();

    telephoneControl.updateValueAndValidity();  
    courrielControl.updateValueAndValidity(); 
    confirmerCourrielControl.updateValueAndValidity(); 
  }

  save(): void {
    
  }

}
