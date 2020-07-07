import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[validateNumber]',
    providers: [{provide: NG_VALIDATORS, useExisting: NumberValidatorDirective, multi: true}]
   })
export class NumberValidatorDirective implements Validator {
   
    public validate(c: FormControl): ValidationErrors {          
      return NumberValidatorDirective.validatePositiveNumber(c.value);
    }

	/*static validateNumber(c: any): ValidationErrors {	
		//const dateRegEx = new RegExp(/^-?\d*\,?\d*$/);
		const dateRegEx = new RegExp(/^-?\d*\.?\d*$/);
		return dateRegEx.test(c) ? null : {numberValidator: {valid: false} };     
	}*/

	static validatePositiveNumber(c: any): ValidationErrors {
		//const dateRegEx = new RegExp(/^\d*\,?\d*$/);
		const dateRegEx = new RegExp(/^\d*\.?\d*$/);
		return dateRegEx.test(c) ? null : { numberValidator: { valid: false } };
	}
}