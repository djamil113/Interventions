import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'inter-prenom',
  templateUrl: './prenom.component.html',
  styleUrls: ['./prenom.component.css']
})
export class PrenomComponent implements OnInit {
  prenomForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.prenomForm = this.fb.group({
        prenom: ['', [Validators.minLength(3)]]
    });
  }

}
