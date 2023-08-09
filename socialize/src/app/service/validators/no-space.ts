import { AbstractControl, ValidatorFn } from '@angular/forms';

// Create a custom validator function
export function spaceValidator(control: AbstractControl): { [key: string]: any } | null {
  // Check if the value contains any spaces
  const containsSpace = /\s/.test(control.value);

  // If the value contains spaces, return an error
  return containsSpace ? { containsSpace: true } : null;
}
