import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'add-event-prompt',
  standalone: true,
  imports: [],
  templateUrl: './add-event-prompt.component.html',
  styleUrls: ['./add-event-prompt.component.css']
})
export class AddEventPromptComponent {
	
	@Output()
	public startAdd = new EventEmitter<void>()

	public onStartAdd() {
		this.startAdd.emit()
	}

}
