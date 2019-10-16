import {NgModule} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {CommonModule} from '@angular/common';
import {ListSubscriberGroupsComponent} from "./controllers/list-subscriber-groups/list-subscriber-groups.component";
import {ListSubscribersComponent} from "./controllers/list-subscribers/list-subscribers.component";
import {SubscriberGroupService} from "./models/subscriber-group/subscriber-group.service";
import {AccountRoutingModule} from "./account-routing.module";
import {AccountComponent} from "./account.component";
import {SubscriberService} from "./models/subscriber/subscriber.service";
import {SubscriberFieldService} from "./models/subscriber-field/subscriber-field.service";
import {SubscriberStateService} from "./models/subscriber-state/subscriber-state.service";
import {ViewSubscriberComponent} from "./controllers/view-subscriber/view-subscriber.component";
import {CreateSubscriberComponent} from "./controllers/create-subscriber/create-subscriber.component";
import {FieldService} from "./models/field/field.service";
import {CreateSubscriberGroupComponent} from "./controllers/create-subscriber-group/create-subscriber-group.component";
import {EditSubscriberComponent} from "./controllers/edit-subscriber/edit-subscriber.component";
import {EditSubscriberFieldsComponent} from "./controllers/edit-subscriber-fields/edit-subscriber-fields.component";

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        AccountRoutingModule
    ],
    declarations: [
        AccountComponent,
        CreateSubscriberComponent,
        CreateSubscriberGroupComponent,
        EditSubscriberComponent,
        EditSubscriberFieldsComponent,
        ListSubscribersComponent,
        ListSubscriberGroupsComponent,
        ViewSubscriberComponent,
    ],
    providers: [
        FieldService,
        SubscriberService,
        SubscriberFieldService,
        SubscriberGroupService,
        SubscriberStateService,
    ],
    exports: [],
    bootstrap: [],
    schemas: []
})
export class AccountModule {}
