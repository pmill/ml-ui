import {AbstractModel} from '../../../core/models/abstract.model';
import {ApiFillable} from '../../../core/models/decorators/api-fillable.decorator';
import {RelatedModel} from "../../../core/models/decorators/related-model.decorator";
import {FieldTypeModel} from "../field-type/field-type.model";

export class FieldModel extends AbstractModel {
    @ApiFillable()
    public id: string;

    @ApiFillable()
    public variable: string;

    @ApiFillable()
    public title: string;

    @ApiFillable()
    public required: boolean;

    @ApiFillable()
    @RelatedModel(FieldTypeModel)
    public fieldType: FieldTypeModel;
}
