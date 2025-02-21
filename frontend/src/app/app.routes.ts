import { Routes } from '@angular/router';
import { LayoutComponent as CalendarLayout } from './calendar/layout/layout.component';
import { HomeComponent } from './calendar/home/home.component';
import { NewEventComponent } from './calendar/new-event/new-event.component';

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
				path: 'new',
				component: NewEventComponent,
			},
		],
	},
	{ path: '', redirectTo: '/calendar', pathMatch: 'full' },
];
