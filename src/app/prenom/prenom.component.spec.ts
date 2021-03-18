import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { PrenomComponent } from './prenom.component';

describe('PrenomComponent', () => {
  let component: PrenomComponent;
  let fixture: ComponentFixture<PrenomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule], // Ajouté
      declarations: [ PrenomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrenomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec 2 caractères', () => {
    let zone = component.prenomForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    expect(zone.invalid).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.prenomForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

});
