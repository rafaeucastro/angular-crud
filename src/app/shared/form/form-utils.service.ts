import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {

  getFormGroupErrorMessage(form: UntypedFormGroup, fieldName: string) {
    const field = form.get(fieldName) as UntypedFormControl;

    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFromField(field: UntypedFormControl) {
    if (field?.hasError('required')) {
      return 'Campo Obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors
        ? field.errors['minlength']['requiredLength']
        : 3;
      return `O campo deve ter no mínimo ${requiredLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 3;
      return `O campo deve ter no máximo ${requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }

  getFormArrayErrorMessage(
    formGroup: UntypedFormGroup,
    formArrayName: string,
    fieldName: string,
    childfromGroudIndex: number
  ) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray
      .at(childfromGroudIndex)
      .get(fieldName) as UntypedFormControl;

    return this.getErrorMessageFromField(field);
  }

  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;

    return (
      !formArray.valid && formArray.hasError('required') && formArray.touched
    );
  }
}
