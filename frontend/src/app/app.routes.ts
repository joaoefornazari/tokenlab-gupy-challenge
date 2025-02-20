import { Routes } from '@angular/router';
import { LayoutComponent as CalendarLayout } from './calendar/layout/layout.component';
import { HomeComponent } from './calendar/home/home.component';
import { NewEventComponent } from './calendar/new-event/new-event.component';

export const routes: Routes = [
	{ path: '', redirectTo: '/calendar/home', pathMatch: 'full' },
	{ 
		path: 'calendar',
		redirectTo: '/calendar/home',
		pathMatch: 'full',
		component: CalendarLayout,
		children: [
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
];
