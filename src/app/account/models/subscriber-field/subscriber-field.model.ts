import {AbstractModel} from '../../../core/models/abstract.model';
import {ApiFillable} from '../../../core/models/decorators/api-fillable.decorator';
import {FieldModel} from "../field/field.model";
import {RelatedModel} from "../../../core/models/decorators";

export class SubscriberFieldModel extends AbstractModel {
    @ApiFillable()
    public id: string;

    @ApiFillable()
    public value: string;

    @ApiFillable()
    @RelatedModel(FieldModel)
    public field: FieldModel;
}
