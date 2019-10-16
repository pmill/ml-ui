import {Component, OnInit} from '@angular/core';
import {SubscriberGroupModel} from "../../models/subscriber-group/subscriber-group.model";
import {SubscriberGroupService} from "../../models/subscriber-group/subscriber-group.service";

@Component({
    templateUrl: './list-subscriber-groups.component.html',
    styleUrls: []
})
export class ListSubscriberGroupsComponent implements OnInit {
    data: {
        subscriberGroups: SubscriberGroupModel[]
    } = {
        subscriberGroups: []
    };

    state: {
        initialised: boolean,
        itemsLoaded: boolean,
        processing: boolean,
    } = {
        initialised: false,
        itemsLoaded: false,
        processing: false,
    };

    constructor(
        protected subscriberGroupService: SubscriberGroupService,
    ) {}

    ngOnInit() {
        this.state.itemsLoaded = false;

        return this.loadPageContents()
            .then(() => {
                this.state.initialised = true;
                this.state.itemsLoaded = true;
            });
    }

    async loadPageContents(): Promise<void> {
        this.data.subscriberGroups = await this.subscriberGroupService.list();
    }
}
