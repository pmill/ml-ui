import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ModelService} from '../../../core/models/model.service';
import {ModelProvider} from "../../../core/models/providers/model.provider";
import {SubscriberModel} from "./subscriber.model";

import {environment} from '../../../../environments/environment';

@Injectable()
export class SubscriberService extends ModelService<ModelProvider<SubscriberModel>, SubscriberModel> {
    constructor(
        private http: HttpClient,
    ) {
        super(
            new ModelProvider<SubscriberModel>(
                http,
                environment.apiBaseUrl + 'subscriber',
                SubscriberModel,
            ),
        );
    }
}
