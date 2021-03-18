import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule], // Ajouté
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test unitaire #1
  it('#1 Zone PRÉNOM invalide avec 2 caractères', () => { 
    let zone = component.problemeForm.controls['probleme'];
    zone.setValue('a'.repeat(2));
    expect(zone.invalid).toBeTruthy();
  });

  // test unitaire #2
  it('#2 Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['probleme'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  // test unitaire #3
  it('#3 Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['probleme'];
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });

  // test unitaire #4
  it('#4 Zone PRÉNOM invalide avec aucune valeur', () => {
    let errors = {};
    let zone = component.problemeForm.controls['probleme'];
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });
});
