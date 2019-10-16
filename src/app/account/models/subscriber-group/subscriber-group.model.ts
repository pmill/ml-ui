import {AbstractModel} from '../../../core/models/abstract.model';
import {ApiFillable} from '../../../core/models/decorators/api-fillable.decorator';

export class SubscriberGroupModel extends AbstractModel {
    @ApiFillable()
    public id: string;

    @ApiFillable()
    public name: string;
}
