import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { UserComponent } from './user';
import { ParkrunComponent } from './parkrun';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'parkrun', component: ParkrunComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);