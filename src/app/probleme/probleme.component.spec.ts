import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategorieService } from './categorie.service';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule], // Ajouté
      declarations: [ ProblemeComponent ],
      providers:[CategorieService]
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
  it('#1 | Zone PRÉNOM invalide avec 2 caractères', () => { 
    let zone = component.problemeForm.controls['probleme'];
    zone.setValue('a'.repeat(2));
    expect(zone.invalid).toBeTrue();
  });

  // test unitaire #2
  it('#2 | Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['probleme'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTrue();
  });

  // test unitaire #3
  it('#3 | Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['probleme'];
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTrue();
  });

  // test unitaire #4
  it('#4 | Zone PRÉNOM invalide avec aucune valeur', () => {
    let errors = {};
    let zone = component.problemeForm.controls['probleme'];
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  // test unitaire #5
  it('#5 | Zone PRÉNOM invalide avec 10 espaces', () => {
    let zone = component.problemeForm.controls['probleme'];
    zone.setValue(' '.repeat(10));
    expect(zone.invalid).toBeTrue();
  });

  // test unitaire #6
  it('#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    let zone = component.problemeForm.controls['probleme'];
    zone.setValue(' '.repeat(2) + 'a'.repeat(1));
    expect(zone.invalid).toBeTrue();
  });

  // test unitaire #15
  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('');

    let zone = component.problemeForm.get('telephone');
    expect(zone.disabled).toBeTrue();
  });

  // test unitaire #16
  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.appliquerNotifications('');

    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toBeNull();
  });

  // test unitaire #17
  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.disabled).toBeTrue();
  });

  // test unitaire #18
  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('');

    let zone = component.problemeForm.get('courrielGroup.confirmerCourriel');
    expect(zone.disabled).toBeTrue();
  });

  // test unitaire #19
  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');

    let zone = component.problemeForm.get('telephone');
    expect(zone.disabled).toBeTrue();
  });

   // test unitaire #20
   it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.enabled).toBeTrue();
  });

   // test unitaire #21
   it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');

    let zone = component.problemeForm.get('courrielGroup.confirmerCourriel');
    expect(zone.enabled).toBeTrue();
  });

  // test unitaire #22
  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');
    let errors = {};

    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  // test unitaire #23
  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');
    let errors = {};

    let zone = component.problemeForm.get('courrielGroup.confirmerCourriel');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  // test unitaire #24
  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications('courriel');
    let errors = {};

    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('test');
    errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  // test unitaire #25
  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.appliquerNotifications('courriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone01 = component.problemeForm.get('courrielGroup.confirmerCourriel');
    zone.setValue('');
    zone01.setValue('a@b.com');
    let groupe = component.problemeForm.get('courrielGroup');
    expect(groupe.invalid).toBeTrue();
  });

  // test unitaire #26
  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.appliquerNotifications('courriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone01 = component.problemeForm.get('courrielGroup.confirmerCourriel');
    zone.setValue('a@b.com');
    zone01.setValue('');
    let groupe = component.problemeForm.get('courrielGroup');
    expect(groupe.invalid).toBeTrue();
  });

  // test unitaire #27
  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL de format valide sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone01 = component.problemeForm.get('courrielGroup.confirmerCourriel');
    zone.setValue('test@test.com');
    zone01.setValue('essai@essai.ca');
    let groupe = component.problemeForm.get('courrielGroup');
    expect(groupe.invalid).toBeTrue();
  });

  // test unitaire #28
  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone01 = component.problemeForm.get('courrielGroup.confirmerCourriel');
    zone.setValue('bon@test.com');
    zone01.setValue('bon@test.com');
    let groupe = component.problemeForm.get('courrielGroup');
    expect(groupe.valid).toBeTrue();
  });

  // test unitaire #29
  it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');

    let zone = component.problemeForm.get('telephone');
    expect(zone.enabled).toBeTrue();
  });

  // test unitaire #30
  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.disabled).toBeTrue();
  });

  // test unitaire #31
  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');

    let zone = component.problemeForm.get('courrielGroup.confirmerCourriel');
    expect(zone.disabled).toBeTrue();
  });

  // test unitaire #32
  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');
    let errors = {};

    let zone = component.problemeForm.get('telephone');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  // test unitaire #33
  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');
    let errors = {};

    let zone = component.problemeForm.get('telephone');
    zone.setValue('test');
    errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  // test unitaire #34
  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');
    let errors = {};

    let zone = component.problemeForm.get('telephone');
    zone.setValue('123456789');
    errors = zone.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

  // test unitaire #35
  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');
    let errors = {};

    let zone = component.problemeForm.get('telephone');
    zone.setValue('01234567890');
    errors = zone.errors || {};
    expect(errors['maxlength']).toBeTruthy();
  });

   // test unitaire #36
   it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');

    let zone = component.problemeForm.get('telephone');
    zone.setValue('0123456789');

    expect(zone.valid).toBeTrue();
  });
}); 
