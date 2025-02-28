import { Routes } from '@angular/router';
import { LayoutComponent as CalendarLayout } from './calendar/layout/layout.component';
import { HomeComponent } from './calendar/home/home.component';

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
		],
	},
	{ path: '', redirectTo: '/calendar', pathMatch: 'full' },
];
