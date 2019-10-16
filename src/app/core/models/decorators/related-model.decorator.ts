import {Model} from '../model.interface';
import {initialisePropertyMetadata} from './model-decorators.helpers';

export function RelatedModel(modelConstructor: {new (): any}) {
    return function (target: Model, propertyKey: string) {
        const propertyMetadata = initialisePropertyMetadata(target, propertyKey);

        propertyMetadata.converter = (value: any) => {
            if (!value) {
                return null;
            }

            const model = new modelConstructor();
            model.fillFromApiResponseData(value);
            return model;
        };
    };
}
