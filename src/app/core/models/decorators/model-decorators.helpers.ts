import {Model} from '../model.interface';

export const PROP_METADATA = '__modelMetadata';

export class PropertyMetadata {
    apiKey: string;
    converter: (value: any) => any = (value: any) => (value);
}

export function initialisePropertyMetadata(model: Model, propertyKey: string): PropertyMetadata {
    const constructor = model.constructor;

    // Use of Object.defineProperty is important since it creates non-enumerable property which
    // prevents the property from being copied during subclassing.
    const meta = (constructor.hasOwnProperty(PROP_METADATA)
        ? (constructor as any)[PROP_METADATA]
        : Object.defineProperty(constructor, PROP_METADATA, {value: {}})[PROP_METADATA]
    );

    meta[propertyKey] = meta.hasOwnProperty(propertyKey) && meta[propertyKey] || new PropertyMetadata();

    return meta[propertyKey];
}

export function getMetadataMap(model: Model): Map<string, PropertyMetadata> {
    const map = new Map<string, PropertyMetadata>();

    let prototype = model['__proto__'];

    // Loop through class hierarchy to make sure we find all the metadata, since it's stored on the constructors
    while (prototype) {
        const constructor = prototype.constructor;
        if (constructor.hasOwnProperty(PROP_METADATA)) {
            const modelMetadata = constructor[PROP_METADATA];
            for (const key of Object.keys(modelMetadata)) {
                map.set(key, modelMetadata[key]);
            }
        }

        prototype = prototype['__proto__'];
    }

    return map;
}
