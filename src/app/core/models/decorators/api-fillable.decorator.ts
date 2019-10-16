import {Model} from '../model.interface';
import {initialisePropertyMetadata} from './model-decorators.helpers';

export function ApiFillable(apiKey: string = null) {
    return function (target: Model, propertyKey: string) {
        const propertyMetadata = initialisePropertyMetadata(target, propertyKey);

        if (!apiKey) {
            apiKey = propertyKey
        }

        propertyMetadata.apiKey = apiKey;
    };
}
