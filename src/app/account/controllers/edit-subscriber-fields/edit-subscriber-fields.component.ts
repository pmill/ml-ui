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
import {SubscriberModel} from "../../models/subscriber/subscriber.model";
import {SubscriberFieldService} from "../../models/subscriber-field/subscriber-field.service";
import {SubscriberFieldModel} from "../../models/subscriber-field/subscriber-field.model";

@Component({
    templateUrl: './edit-subscriber-fields.component.html',
    styleUrls: []
})
export class EditSubscriberFieldsComponent implements OnInit {
    @ViewChild('form')
    form: NgForm;

    data: {
        subscriberFields: SubscriberFieldModel[],
        subscriberFieldIdMap: {[id: string]: SubscriberFieldModel}
        subscriber: SubscriberModel,
    } = {
        subscriberFields: [],
        subscriberFieldIdMap: {},
        subscriber: null,
    };

    model: {
        fields: {[id: string]: string},
    } = {
        fields: {},
    };

    state: {
        dataLoaded: boolean,
        submitting: boolean,
    } = {
        dataLoaded: false,
        submitting: false,
    };

    subscriberId: string;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected fieldService: FieldService,
        protected inputErrorService: InputErrorService,
        protected router: Router,
        protected subscriberService: SubscriberService,
        protected subscriberFieldService: SubscriberFieldService,
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.subscriberId = params['id'];

            return this.loadData()
                .then(() => {
                    this.state.dataLoaded = true;
                });
        });
    }

    async loadData(): Promise<void> {
        [
            this.data.subscriberFields,
            this.data.subscriber
        ] = await Promise.all([
            this.subscriberFieldService.list({subscriber: this.subscriberId}),
            this.subscriberService.find(this.subscriberId),
        ]);

        this.data.subscriberFieldIdMap = {};
        for (const subscriberField of this.data.subscriberFields) {
            this.data.subscriberFieldIdMap[subscriberField.id] = subscriberField;
        }

        for (const subscriberField of this.data.subscriberFields) {
            this.model.fields[subscriberField.id] = subscriberField.value;
        }
    }

    async editSubscriberFields(): Promise<void> {
        this.state.submitting = true;

        const promises = Object.keys(this.model.fields)
            // only get fields that have changed values
            .filter((id: string) => this.model.fields[id] !== this.data.subscriberFieldIdMap[id].value)
            // generate an update request
            .map((id: string) => this.getUpdateFieldPromise(id));

        try {
            await Promise.all(promises);

            await this.router.navigate(['/account', 'subscribers', this.subscriberId]);
        } catch (response) {
            // ignore as should be handled directly by the request promises
        } finally {
            this.state.submitting = false;
        }
    }

    getUpdateFieldPromise(subscriberFieldId: string): Promise<any> {
        return this.subscriberFieldService
            .update(subscriberFieldId, {value: this.model.fields[subscriberFieldId]})
            .catch((response) => {
                const variable = this.data.subscriberFieldIdMap[subscriberFieldId].field.variable;
                const inputErrors = {};

                if (response.error.data.errors.hasOwnProperty('body.value')) {
                    console.log('1');
                    for (const errorKey of Object.keys(response.error.data.errors['body.value'])) {
                        console.log('2', errorKey);
                        inputErrors[errorKey] = true;
                    }
                }

                this.form.controls[variable].setErrors(inputErrors);
console.log(inputErrors, this.form.controls[variable]);
                throw response;
            });
    }
}
