import {NgModule} from '@angular/core';
import {EmptyComponent} from './empty.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ShowErrorsDirective} from "./directives/show-errors.directive";
import {ErrorMessageComponent} from "./components/error-messages/error-message.component";
import {ErrorMessagesComponent} from "./components/error-messages/error-messages.component";
import {InputErrorService} from "./services/input-error.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        EmptyComponent,
        ErrorMessageComponent,
        ErrorMessagesComponent,
        ShowErrorsDirective,
    ],
    providers: [
        InputErrorService,
    ],
    exports: [
        EmptyComponent,
        ErrorMessageComponent,
        ErrorMessagesComponent,
        ShowErrorsDirective,
    ],
    bootstrap: [],
    schemas: []
})
export class CoreModule {
}
