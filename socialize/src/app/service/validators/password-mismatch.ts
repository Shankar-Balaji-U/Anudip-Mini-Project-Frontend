import { AbstractControl, ValidatorFn } from '@angular/forms';

// custom validator to check that two fields match
export function matchWith(matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const matchingControl = control.parent?.get(matchingControlName);
        console.log()
        if (!control || !matchingControl) {
            return null;
        }

        // // return if another validator has already found an error on the matchingControl
        if (!matchingControl.touched) {
            return null;
        }

        // set error on matchingControl if validation fails
        if (control.value != "" && control.value !== matchingControl.value) {
            return { mismatch: true };
        }

        return null;
    }
}