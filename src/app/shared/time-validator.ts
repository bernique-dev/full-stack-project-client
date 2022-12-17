import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {TimeOfDay} from "./time-of-day";

export function TimeValidator(timeString : string, isMin : boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log('[' + timeString + ']')
    if (isMin) {
      const forbidden = control.value >= TimeOfDay.ofString(timeString);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    }else {
      const forbidden = control.value < TimeOfDay.ofString(timeString);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    }

  };
}

