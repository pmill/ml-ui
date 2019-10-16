import {ApiModelProvider} from './api-model-provider.interface';

export abstract class ModelService<P extends ApiModelProvider<T>, T> {
    constructor(
        protected apiModelProvider: P,
    ) {}

    async list(params: Object = {}): Promise<T[]> {
        return this.apiModelProvider.list(params);
    }

    async find(id: string|number): Promise<T> {
        return this.apiModelProvider.find(id);
    }

    async store(params: Object): Promise<T> {
        return this.apiModelProvider.store(params);
    }

    async update(id: string|number, params: Object): Promise<T> {
        return await this.apiModelProvider.update(id, params);
    }

    async deleteModel(id: string|number): Promise<void> {
        return this.apiModelProvider.deleteModel(id);
    }

    async mapByNumber(params: Object = {}, key = 'id'): Promise<{[id: number]: T}> {
        const models = await this.list(params);

        const map: {[id: number]: T} = {};
        for (const model of models) {
            map[model[key]] = model;
        }

        return map;
    }
}
