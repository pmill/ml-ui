import {Model} from '../model.interface';
import {initialisePropertyMetadata} from './model-decorators.helpers';

export function Timestamp() {
    return function (target: Model, propertyKey: string) {
        const propertyMetadata = initialisePropertyMetadata(target, propertyKey);

        propertyMetadata.converter = (value: any) => {
            return new Date(value);
        };
    };
}
