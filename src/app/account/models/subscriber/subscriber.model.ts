import {AbstractModel} from '../../../core/models/abstract.model';
import {ApiFillable} from '../../../core/models/decorators/api-fillable.decorator';
import {RelatedModels, Timestamp} from "../../../core/models/decorators";
import {SubscriberFieldModel} from "../subscriber-field/subscriber-field.model";

export class SubscriberModel extends AbstractModel {
    @ApiFillable()
    public id: string;

    @ApiFillable()
    @Timestamp()
    public createdAt: Date;

    @ApiFillable()
    public subscriberGroupId: string;

    @ApiFillable()
    public subscriberGroupName: string;

    @ApiFillable()
    public subscriberStateId: string;

    @ApiFillable()
    public subscriberStateName: string;

    @ApiFillable()
    @RelatedModels(SubscriberFieldModel)
    public subscriberFields: SubscriberFieldModel[];

    get name(): string {
        return [
            this.getFieldValueByVariable('firstName'),
            this.getFieldValueByVariable('lastName')
        ].join(' ').trim();
    }

    get email(): string {
        return this.getFieldValueByVariable('email');
    }

    getFieldValueByVariable(variable: string): string {
        const field = this.subscriberFields.find(
            (subscriberField: SubscriberFieldModel) => variable === subscriberField.field.variable
        );

        if (!field) {
            return null;
        }

        return field.value;
    }
}
