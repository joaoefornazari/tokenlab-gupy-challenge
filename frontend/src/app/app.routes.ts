import { Routes } from '@angular/router';
import { LayoutComponent as CalendarLayout } from './calendar/layout/layout.component';
import { HomeComponent } from './calendar/home/home.component';
import { LoginComponent } from './calendar/login/login.component';
import { LogonComponent } from './calendar/logon/logon.component';

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
