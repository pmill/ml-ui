import {Model} from '../model.interface';
import {initialisePropertyMetadata} from './model-decorators.helpers';

export function RelatedModels(modelConstructor: {new (): any}) {
    return function (target: Model, propertyKey: string) {
        const propertyMetadata = initialisePropertyMetadata(target, propertyKey);

        propertyMetadata.converter = (value: any[]) => {
            if (!Array.isArray(value)) {
                return null;
            }

            const models = [];
            for (const subValue of value) {
                const model = new modelConstructor();
                model.fillFromApiResponseData(subValue);
                models.push(model);
            }
            return models;
        };
    };
}
