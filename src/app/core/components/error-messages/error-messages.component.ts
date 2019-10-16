import {
    ContentChildren, QueryList, Component, ViewChildren, ElementRef, Inject, AfterViewInit, Input
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {NgModel} from '@angular/forms';

import {ErrorMessageComponent} from './error-message.component';

@Component({
    selector: 'error-messages',
    templateUrl: './error-messages.component.html',
})
export class ErrorMessagesComponent implements AfterViewInit {
    @ViewChildren(ErrorMessageComponent) ownErrorMessages: QueryList<ErrorMessageComponent>;
    @ContentChildren(ErrorMessageComponent) childErrorMessages: QueryList<ErrorMessageComponent>;

    _field: NgModel;
    errorMessageMap: Map<string, ErrorMessageComponent> = new Map<string, ErrorMessageComponent>();

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private elementRef: ElementRef
    ) {}

    ngAfterViewInit(): void {
        // Loop through default errors first, so that child ones override them
        this.ownErrorMessages.forEach((item) => {
            this.errorMessageMap.set(item.errorType, item);
        });
        this.childErrorMessages.forEach((item) => {
            this.errorMessageMap.set(item.errorType, item);
        });
        this.errorMessageMap.forEach((item) => {
            item.field = this._field;
        });
    }

    set field(field: NgModel) {
        this._field = field;
        this.errorMessageMap.forEach((item) => {
            item.field = field;
        });
    }
}
