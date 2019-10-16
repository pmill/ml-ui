import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ModelService} from '../../../core/models/model.service';
import {ModelProvider} from "../../../core/models/providers/model.provider";

import {environment} from '../../../../environments/environment';
import {SubscriberGroupModel} from "./subscriber-group.model";

@Injectable()
export class SubscriberGroupService extends ModelService<ModelProvider<SubscriberGroupModel>, SubscriberGroupModel> {
    constructor(
        private http: HttpClient,
    ) {
        super(
            new ModelProvider<SubscriberGroupModel>(
                http,
                environment.apiBaseUrl + 'subscriber-group',
                SubscriberGroupModel,
            ),
        );
    }
}
