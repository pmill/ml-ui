import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ModelService} from '../../../core/models/model.service';
import {ModelProvider} from "../../../core/models/providers/model.provider";

import {environment} from '../../../../environments/environment';
import {SubscriberFieldModel} from "./subscriber-field.model";

@Injectable()
export class SubscriberFieldService extends ModelService<ModelProvider<SubscriberFieldModel>, SubscriberFieldModel> {
    constructor(
        private http: HttpClient,
    ) {
        super(
            new ModelProvider<SubscriberFieldModel>(
                http,
                environment.apiBaseUrl + 'subscriber-field',
                SubscriberFieldModel,
            ),
        );
    }
}
