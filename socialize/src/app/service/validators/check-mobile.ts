import { AbstractControl, ValidatorFn } from '@angular/forms';

export function mobileNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const mobileNumberPattern = /^[0-9]{10}$/; // Regular expression to validate 10-digit mobile numbers
    console.log(control.value)
    const valid = mobileNumberPattern.test(control.value);
    return valid ? null : { mobileNo: true };
  };
}