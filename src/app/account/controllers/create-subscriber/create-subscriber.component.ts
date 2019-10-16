import {Component, OnInit, ViewChild} from '@angular/core';
import {SubscriberGroupModel} from "../../models/subscriber-group/subscriber-group.model";
import {SubscriberService} from "../../models/subscriber/subscriber.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubscriberGroupService} from "../../models/subscriber-group/subscriber-group.service";
import {FieldService} from "../../models/field/field.service";
import {FieldModel} from "../../models/field/field.model";
import {SubscriberStateIdEnum} from "../../models/subscriber-state/subscriber-state-id.enum";
import {NgForm} from "@angular/forms";
import {InputErrorService} from "../../../core/services/input-error.service";

@Component({
    templateUrl: './create-subscriber.component.html',
    styleUrls: []
})
export class CreateSubscriberComponent implements OnInit {
    @ViewChild('form')
    form: NgForm;

    data: {
        fields: FieldModel[],
        subscriberGroups: SubscriberGroupModel[],
    } = {
        fields: [],
        subscriberGroups: [],
    };

    model: {
        subscriberGroup: SubscriberGroupModel,
        fields: {[variable: string]: string},
    } = {
        subscriberGroup: null,
        fields: {},
    };

    state: {
        dataLoaded: boolean,
        submitting: boolean,
    } = {
        dataLoaded: false,
        submitting: false,
    };

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected fieldService: FieldService,
        protected inputErrorService: InputErrorService,
        protected router: Router,
        protected subscriberService: SubscriberService,
        protected subscriberGroupService: SubscriberGroupService,
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            return this.loadData()
                .then(() => {
                    this.state.dataLoaded = true;
                });
        });
    }

    async loadData(): Promise<void> {
        [
           this.data.fields,
           this.data.subscriberGroups
        ] = await Promise.all([
            this.fieldService.list(),
            this.subscriberGroupService.list(),
        ]);

        for (const field of this.data.fields) {
            this.model.fields[field.variable] = null;
        }
    }

    async createSubscriber(): Promise<void> {
        this.state.submitting = true;

        const payload = {
            subscriberGroup: this.model.subscriberGroup.id,
            subscriberState: SubscriberStateIdEnum.Active,
            fields: this.model.fields,
        };

        try {
            await this.subscriberService.store(payload);

            this.router.navigate(['/account', 'subscribers']);
        } catch (response) {
            if (response.status === 422) {
                this.inputErrorService.processErrorResponse(response.error, this.form);
            }
        } finally {
            this.state.submitting = false;
        }
    }
}
