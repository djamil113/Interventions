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
        typeCategorie: ['', [Validators.required]]
    });

    this.categories.obtenirCategories()
    .subscribe(cat => this.categoriesProblemes = cat,
               error => this.errorMessage = <any>error);  
  }

  save(): void {
    
  }

}
