import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    templateUrl: './account.component.html',
    styleUrls: []
})
export class AccountComponent {
    constructor(
        protected router: Router,
    ) {}
}
