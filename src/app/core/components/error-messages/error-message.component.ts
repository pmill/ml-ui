import {Component, Input} from '@angular/core';
import {NgModel} from '@angular/forms';

@Component({
    selector: 'error-message',
    templateUrl: './error-message.component.html'
})
export class ErrorMessageComponent {
    @Input() errorType: string;

    field: NgModel;
    isActive = false;
}
