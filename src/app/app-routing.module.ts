import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {EmptyComponent} from './core/empty.component';

const routes: Routes = [
    {
        path: 'account',
        loadChildren: './account/account.module#AccountModule'
    },
    {
        path: '**',
        component: EmptyComponent
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
    ]
})
export class AppRoutingModule {}
