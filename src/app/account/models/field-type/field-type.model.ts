import {AbstractModel} from '../../../core/models/abstract.model';
import {ApiFillable} from '../../../core/models/decorators/api-fillable.decorator';
import {RelatedModel} from "../../../core/models/decorators/related-model.decorator";

export class FieldTypeModel extends AbstractModel {
    @ApiFillable()
    public id: string;

    @ApiFillable()
    public name: string;

    @ApiFillable()
    public inputType: string;
}
