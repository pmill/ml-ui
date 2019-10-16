import {Injectable} from "@angular/core";

import {SubscriberStateModel} from "./subscriber-state.model";
import {SubscriberStateIdEnum} from "./subscriber-state-id.enum";

@Injectable()
export class SubscriberStateService {
    protected states = [
        new SubscriberStateModel(SubscriberStateIdEnum.Active, 'Active'),
        new SubscriberStateModel(SubscriberStateIdEnum.Bounced, 'Bounced'),
        new SubscriberStateModel(SubscriberStateIdEnum.Junk, 'Junk'),
        new SubscriberStateModel(SubscriberStateIdEnum.Unconfirmed, 'Unconfirmed'),
        new SubscriberStateModel(SubscriberStateIdEnum.Unsubscribed, 'Unsubscribed'),
    ];

    async find(id: string|number): Promise<SubscriberStateModel> {
        const state = this.states.find(
            (subscriberState: SubscriberStateModel) => subscriberState.id === id
        );

        return Promise.resolve(state);
    }

    async list(): Promise<SubscriberStateModel[]> {
        return Promise.resolve(this.states);
    }

    async mapByNumber(key = 'id'): Promise<{[id: number]: SubscriberStateModel}> {
        const models = await this.list();

        const map: {[id: number]: SubscriberStateModel} = {};
        for (const model of models) {
            map[model[key]] = model;
        }

        return map;
    }
}
