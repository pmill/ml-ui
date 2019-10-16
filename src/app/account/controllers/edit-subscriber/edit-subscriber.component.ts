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
import {SubscriberStateModel} from "../../models/subscriber-state/subscriber-state.model";
import {SubscriberStateService} from "../../models/subscriber-state/subscriber-state.service";

@Component({
    templateUrl: './edit-subscriber.component.html',
    styleUrls: []
})
export class EditSubscriberComponent implements OnInit {
    @ViewChild('form')
    form: NgForm;

    data: {
        subscriber: SubscriberModel,
        subscriberGroups: SubscriberGroupModel[],
        subscriberStates: SubscriberStateModel[],
    } = {
        subscriber: null,
        subscriberGroups: [],
        subscriberStates: [],
    };

    model: {
        subscriberGroup: SubscriberGroupModel,
        subscriberState: SubscriberStateModel,
    } = {
        subscriberGroup: null,
        subscriberState: null,
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
        protected inputErrorService: InputErrorService,
        protected router: Router,
        protected subscriberService: SubscriberService,
        protected subscriberGroupService: SubscriberGroupService,
        protected subscriberStateService: SubscriberStateService,
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
            this.data.subscriber,
            this.data.subscriberGroups,
            this.data.subscriberStates
        ] = await Promise.all([
            this.subscriberService.find(this.subscriberId),
            this.subscriberGroupService.list(),
            this.subscriberStateService.list(),
        ]);

        this.model.subscriberGroup = this.data.subscriberGroups.find(
            (group: SubscriberGroupModel) => this.data.subscriber.subscriberGroupId === group.id
        );

        this.model.subscriberState = this.data.subscriberStates.find(
            (state: SubscriberStateModel) => this.data.subscriber.subscriberStateId === state.id
        );
    }

    async editSubscriber(): Promise<void> {
        this.state.submitting = true;

        const payload = {
            subscriberGroup: this.model.subscriberGroup.id,
            subscriberState: this.model.subscriberState.id,
        };

        try {
            await this.subscriberService.update(this.subscriberId, payload);

            this.router.navigate(['/account', 'subscribers', this.subscriberId]);
        } catch (response) {
            if (response.status === 422) {
                this.inputErrorService.processErrorResponse(response.error, this.form);
            }
        } finally {
            this.state.submitting = false;
        }
    }
}
