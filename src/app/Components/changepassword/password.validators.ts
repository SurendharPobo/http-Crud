import { AbstractControl } from "@angular/forms";

export class PasswordValidators {
    static validoldPassword(control: AbstractControl) {
        return new Promise((resolve) => {
            if (control.value !== '123456') {
                resolve({ invalidOldPassword: true });
            }
            else {
                resolve(null);
            }
        });
    }
}