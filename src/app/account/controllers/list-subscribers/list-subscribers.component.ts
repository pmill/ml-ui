import {Component, OnInit} from '@angular/core';
import {SubscriberModel} from "../../models/subscriber/subscriber.model";
import {SubscriberService} from "../../models/subscriber/subscriber.service";
import {SubscriberGroupService} from "../../models/subscriber-group/subscriber-group.service";
import {SubscriberGroupModel} from "../../models/subscriber-group/subscriber-group.model";
import {SubscriberStateModel} from "../../models/subscriber-state/subscriber-state.model";
import {SubscriberStateService} from "../../models/subscriber-state/subscriber-state.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    templateUrl: './list-subscribers.component.html',
    styleUrls: []
})
export class ListSubscribersComponent implements OnInit {
    data: {
        subscribers: SubscriberModel[],
        subscriberGroups: SubscriberGroupModel[],
        subscriberGroupIdMap: {[id: number]: SubscriberGroupModel},
        subscriberStateIdMap: {[id: number]: SubscriberStateModel},
    } = {
        subscribers: [],
        subscriberGroups: [],
        subscriberGroupIdMap: {},
        subscriberStateIdMap: {},
    };

    model: {
        filters: {
            subscriberGroup: string,
        },
    } = {
        filters: {
            subscriberGroup: null,
        },
    };

    state: {
        filtered: boolean,
        dataLoaded: boolean,
        pageContentsLoaded: boolean,
        processing: boolean,
    } = {
        filtered: false,
        dataLoaded: false,
        pageContentsLoaded: false,
        processing: false,
    };

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected subscriberService: SubscriberService,
        protected subscriberGroupService: SubscriberGroupService,
        protected subscriberStateService: SubscriberStateService,
    ) {}

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params) => {
            this.state.pageContentsLoaded = false;

            if (params.hasOwnProperty('subscriberGroup')) {
                this.model.filters.subscriberGroup = params.subscriberGroup;
            } else {
                this.model.filters.subscriberGroup = null;
            }

            return Promise.all([
                    this.loadPageContents(),
                    this.loadData(),
                ])
                .then(() => {
                    this.state.dataLoaded = true;
                    this.state.pageContentsLoaded = true;
                });
        });
    }

    async loadData(): Promise<void> {
        if (this.state.dataLoaded) {
            return;
        }

        [
            this.data.subscriberGroupIdMap,
            this.data.subscriberStateIdMap
        ] = await Promise.all([
            this.subscriberGroupService.mapByNumber({}, 'id'),
            this.subscriberStateService.mapByNumber('id'),
        ]);

        this.data.subscriberGroups = Object.keys(this.data.subscriberGroupIdMap).map(
            (key: string) => this.data.subscriberGroupIdMap[key],
        );
    }

    async loadPageContents(): Promise<void> {
        const subscriberFilterParameters = this.getSubscriberFilterParameters();

        this.state.filtered = Object.keys(subscriberFilterParameters).length > 0;
        this.data.subscribers = await this.subscriberService.list(subscriberFilterParameters);
    }

    onFilterChange() {
        const subscriberFilterParameters = this.getSubscriberFilterParameters();

        this.router.navigate(
            ['/account', 'subscribers'],
            {queryParams: subscriberFilterParameters}
        );
    }

    protected getSubscriberFilterParameters(): object {
        const filterParameters: {[key: string]: string} = {};

        for (const key of Object.keys(this.model.filters)) {
            if (this.model.filters[key]) {
                filterParameters[key] = this.model.filters[key];
            }
        }

        return filterParameters;
    }
}
