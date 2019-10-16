import {HttpClient, HttpParams} from '@angular/common/http';

import {ApiModelProvider} from '../api-model-provider.interface';
import {Model} from '../model.interface';

export class ModelProvider<T extends Model> implements ApiModelProvider<T> {
    protected static objectToHttpParams(object: Object): HttpParams {
        let httpParams = new HttpParams();

        Object.keys(object).forEach(key => {
            if (Array.isArray(object[key])) {
                for (const value of object[key]) {
                    httpParams = httpParams.append(key + '[]', value);
                }
            } else {
                httpParams = httpParams.set(key, object[key]);
            }
        });

        return httpParams;
    }

    constructor(
        protected http: HttpClient,
        protected baseUrl: string,
        protected modelCreator: {new (): T}
    ) {}

    async list(params: Object = {}): Promise<T[]> {
        const url = this.getCollectionUrl();
        const options = await this.getOptions(params);

        const response = await this.http.get(url, options).toPromise();

        return this.extractModelCollection(response);
    }

    async find(id: string|number): Promise<T> {
        const url = this.getObjectUrl(id);
        const options = await this.getOptions({});

        const response = await this.http.get(url, options).toPromise();

        return this.extractModel(response);
    }

    async store(params: Object): Promise<T> {
        const url = this.getCollectionUrl();
        const options = await this.getOptions({});

        const response = await this.http.post(url, params, options).toPromise();

        return this.extractModel(response);
    }

    async storeMultiple(params: Object): Promise<T[]> {
        const url = this.getCollectionUrl();
        const options = await this.getOptions({});

        const response = await this.http.post(url, params, options).toPromise();

        return this.extractModelCollection(response);
    }

    async replaceCollection(data: Object, params: Object): Promise<T[]> {
        const url = this.getCollectionUrl();
        const options = await this.getOptions(params);

        const response = await this.http.put(url, data, options).toPromise();

        return this.extractModelCollection(response);
    }

    async update(id: string|number, params: Object): Promise<T> {
        const url = this.getObjectUrl(id);
        const options = await this.getOptions({});

        const response = await this.http.patch(url, params, options).toPromise();

        return this.extractModel(response);
    }

    async deleteModel(id: string|number): Promise<void> {
        const url = this.getObjectUrl(id);
        const options = await this.getOptions({});

        await this.http.delete(url, options).toPromise();
    }

    protected getCollectionUrl(): string {
        return this.baseUrl;
    }

    protected getObjectUrl(id: string|number): string {
        return `${this.baseUrl}/${id}`;
    }

    public getBaseUrl(): string {
        return this.baseUrl;
    }

    public async getOptions(params: Object): Promise<object> {
        return {
            params: ModelProvider.objectToHttpParams(params)
        };
    }

    public buildModel(modelData: Object): T {
        const model: T = new this.modelCreator();

        model.fillFromApiResponseData(modelData);

        return model;
    }

    public buildModelCollection(modelDataCollection: Object[]): T[] {
        const models: T[] = [];
        for (const modelData of modelDataCollection) {
            models.push(this.buildModel(modelData));
        }

        return models;
    }

    protected extractModelData(response: Object): Object {
        return response['data'];
    }

    protected extractModelCollectionData(response: Object): Object[] {
        return response['data'];
    }

    public extractModel(response: Object): T {
        return this.buildModel(this.extractModelData(response));
    }

    public extractModelCollection(response: Object): T[] {
        return this.buildModelCollection(this.extractModelCollectionData(response));
    }
}
