import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from './account.component';
import {ListSubscriberGroupsComponent} from "./controllers/list-subscriber-groups/list-subscriber-groups.component";
import {ListSubscribersComponent} from "./controllers/list-subscribers/list-subscribers.component";
import {ViewSubscriberComponent} from "./controllers/view-subscriber/view-subscriber.component";
import {CreateSubscriberComponent} from "./controllers/create-subscriber/create-subscriber.component";
import {CreateSubscriberGroupComponent} from "./controllers/create-subscriber-group/create-subscriber-group.component";
import {EditSubscriberComponent} from "./controllers/edit-subscriber/edit-subscriber.component";
import {EditSubscriberFieldsComponent} from "./controllers/edit-subscriber-fields/edit-subscriber-fields.component";

const routes: Routes = [
    {
        path: '',
        component: AccountComponent,
        children: [
            {
                path: 'subscribers',
                component: ListSubscribersComponent,
            },
            {
                path: 'subscribers/create',
                component: CreateSubscriberComponent,
            },
            {
                path: 'subscribers/:id',
                component: ViewSubscriberComponent,
            },
            {
                path: 'subscribers/:id/edit',
                component: EditSubscriberComponent,
            },
            {
                path: 'subscribers/:id/edit-fields',
                component: EditSubscriberFieldsComponent,
            },
            {
                path: 'groups',
                component: ListSubscriberGroupsComponent,
            },
            {
                path: 'groups/create',
                component: CreateSubscriberGroupComponent,
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {}
