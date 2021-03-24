import { AbstractControl, ValidatorFn } from "@angular/forms";

export class ZonesValidator {
    static longueurMinimum(longueurMinimum: number): ValidatorFn {
        // Sous ANGULAR dans les validateurs pour indiquer un succès retourner null autrement retourner un clé valeur Json
        return (valeurControle: AbstractControl): {[longueur: string]: boolean} | null => {
            if (valeurControle.value == null) {
                return {'nbreCaracteresInsuffisants': true};
            }
            if (valeurControle.value.trim().length >= longueurMinimum) {
                return null;
            }
            return {'nbreCaracteresInsuffisants': true};
        }
    }
}