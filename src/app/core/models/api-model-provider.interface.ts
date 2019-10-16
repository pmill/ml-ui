import 'rxjs/add/operator/toPromise';

export interface ApiModelProvider<T> {
    list(params: Object): Promise<T[]>;

    find(id: string|number): Promise<T>;

    store(params: Object): Promise<T>;

    storeMultiple(params: Object): Promise<T[]>;

    replaceCollection(data: Object, params: Object): Promise<T[]>;

    update(id: string|number, params: Object): Promise<T>;

    deleteModel(id: string|number): Promise<void>;
}
