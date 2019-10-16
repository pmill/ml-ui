import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {SubscriberGroupService} from "../../models/subscriber-group/subscriber-group.service";
import {NgForm} from "@angular/forms";
import {InputErrorService} from "../../../core/services/input-error.service";

@Component({
    templateUrl: './create-subscriber-group.component.html',
    styleUrls: []
})
export class CreateSubscriberGroupComponent {
    @ViewChild('form')
    form: NgForm;

    model: {
        name: string,
    } = {
        name: null,
    };

    state: {
        submitting: boolean,
    } = {
        submitting: false,
    };

    constructor(
        protected router: Router,
        protected inputErrorService: InputErrorService,
        protected subscriberGroupService: SubscriberGroupService,
    ) {}

    async createSubscriberGroup(): Promise<void> {
        this.state.submitting = true;

        const payload = {
            name: this.model.name,
        };

        try {
            await this.subscriberGroupService.store(payload);

            this.router.navigate(['/account', 'groups']);
        } catch (response) {
            if (response.status === 422) {
                this.inputErrorService.processErrorResponse(response.error, this.form);
            }
        } finally {
            this.state.submitting = false;
        }
    }
}
