import {Model} from './model.interface';
import {getMetadataMap} from './decorators/model-decorators.helpers';

export class AbstractModel implements Model {
    fillFromApiResponseData(apiResponseData: Object): void {
        getMetadataMap(this).forEach((propertyMetadata, propertyKey) => {
            const apiKey = propertyMetadata.apiKey;

            if (apiResponseData.hasOwnProperty(propertyMetadata.apiKey)) {
                this[propertyKey.valueOf()] = apiResponseData[propertyMetadata.apiKey];
            }
        });
    }
}
