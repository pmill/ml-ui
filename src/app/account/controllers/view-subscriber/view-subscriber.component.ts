import {Component, OnInit} from '@angular/core';
import {SubscriberGroupModel} from "../../models/subscriber-group/subscriber-group.model";
import {SubscriberGroupService} from "../../models/subscriber-group/subscriber-group.service";
import {SubscriberModel} from "../../models/subscriber/subscriber.model";
import {SubscriberService} from "../../models/subscriber/subscriber.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubscriberStateService} from "../../models/subscriber-state/subscriber-state.service";
import {SubscriberStateModel} from "../../models/subscriber-state/subscriber-state.model";
import {Deferred} from "../../../core/objects/deferred.object";

@Component({
    templateUrl: './view-subscriber.component.html',
    styleUrls: []
})
export class ViewSubscriberComponent implements OnInit {
    data: {
        subscriber: SubscriberModel,
    } = {
        subscriber: null,
    };

    state: {
        dataLoaded: boolean,
        deleting: boolean,
        processing: boolean,
    } = {
        dataLoaded: false,
        deleting: false,
        processing: false,
    };

    subscriberId: string;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected subscriberService: SubscriberService,
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.subscriberId = params['id'];

            return this.loadPageContents()
                .then(() => {
                    this.state.dataLoaded = true;
                });
        });
    }

    async loadPageContents(): Promise<void> {
        this.data.subscriber = await this.subscriberService.find(this.subscriberId);
    }

    async deleteSubscriber() {
        this.state.deleting = true;

        this.subscriberService
            .deleteModel(this.subscriberId)
            .then(() => {
                this.router.navigate(['/account', 'subscribers']);
            })
            .finally(() => {
                this.state.deleting = false;
            });
    }
}
