import {Directive, Input, ContentChild, HostBinding} from '@angular/core';
import {NgModel} from '@angular/forms';

import {ErrorMessagesComponent} from '../components/error-messages/error-messages.component';

@Directive({
    selector: '[showErrors]',
})
export class ShowErrorsDirective {
    @ContentChild(ErrorMessagesComponent) errorMessages: ErrorMessagesComponent;

    protected field: NgModel;

    @Input()
    set showErrors(field: NgModel) {
        this.field = field;
        if (this.errorMessages) {
            this.errorMessages.field = field;
        }
    }

    @HostBinding('class.has-error')
    get hasError(): boolean {
        return (this.field && (this.field.dirty || this.field.touched) && this.field.invalid);
    }
}
