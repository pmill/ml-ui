import {Injectable} from "@angular/core";
import {NgForm} from "@angular/forms";

@Injectable()
export class InputErrorService
{
    public processErrorResponse(response: any, form: NgForm) {
        const errors = response.data.errors;

        for (const fieldKey of Object.keys(errors)) {
            const inputName = fieldKey.split('.').pop();

            const inputErrors = {};

            for (const errorKey of Object.keys(errors[fieldKey])) {
                inputErrors[errorKey] = true;
            }

            if (form.controls.hasOwnProperty(inputName)) {
                form.controls[inputName].setErrors(inputErrors);
            }
        }
    }
}
