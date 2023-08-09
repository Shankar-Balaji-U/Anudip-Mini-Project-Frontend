import { AbstractControl, ValidatorFn } from '@angular/forms';


export function imageSize(maxSizeInKB: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const file = control.value;
    
    // Check if a file is selected
    if (file && file.size) {
      const fileSizeInKB = file.size / 1024;
      if (fileSizeInKB > maxSizeInKB) {
        return { size: { currentSize: fileSizeInKB, maxSize: maxSizeInKB } };
      }
    }

    return null; // Image size is valid
  };
}
