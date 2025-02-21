import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent as CalendarHeader } from './header/header.component';

@Component({
  selector: 'calendar-layout',
	standalone: true,
  imports: [CommonModule, RouterOutlet, CalendarHeader],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {

}
