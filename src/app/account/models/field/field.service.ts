import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ModelService} from '../../../core/models/model.service';
import {ModelProvider} from "../../../core/models/providers/model.provider";

import {environment} from '../../../../environments/environment';
import {FieldModel} from "./field.model";

@Injectable()
export class FieldService extends ModelService<ModelProvider<FieldModel>, FieldModel> {
    constructor(
        private http: HttpClient,
    ) {
        super(
            new ModelProvider<FieldModel>(
                http,
                environment.apiBaseUrl + 'field',
                FieldModel,
            ),
        );
    }
}
