import { Routes } from '@angular/router';
import { LayoutComponent as CalendarLayout } from './calendar/layout/layout.component';
import { HomeComponent } from './calendar/home/home.component';
import { LoginComponent } from './calendar/login/login.component';
import { LogonComponent } from './calendar/logon/logon.component';
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import AuthService from './services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
	return inject(AuthService).isAuthenticated();
};

export const routes: Routes = [
	{ 
		path: 'calendar',
		component: CalendarLayout,
		children: [
			{
				path: '',
				redirectTo: 'home',
				pathMatch: 'full',
			},
			{
				path: 'home',
				component: HomeComponent,
				canActivate: [authGuard],
			},
			{
				path: 'login',
				component: LoginComponent,
			},
			{
				path: 'logon',
				component: LogonComponent,
			}
		],
	},
	{ path: '', redirectTo: '/calendar', pathMatch: 'full' },
];
