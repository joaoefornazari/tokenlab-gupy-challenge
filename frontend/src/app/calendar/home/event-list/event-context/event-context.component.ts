import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Action, CalendarEvent } from 'src/types'
import { EventService } from 'src/app/services/event.service'
import { AddEventPromptComponent } from './add-event-prompt/add-event-prompt.component'
import { EventFormComponent } from './event-form/event-form.component'
import { EventBadgeComponent } from './event-badge/event-badge.component'
import { EventDeleteConfirmComponent } from './event-delete-confirm/event-delete-confirm.component'

@Component({
  selector: 'event-context',
  imports: [
		AddEventPromptComponent, 
		EventBadgeComponent, 
		EventFormComponent, 
		EventFormComponent, 
		EventDeleteConfirmComponent
	],
  standalone: true,
  providers: [EventService],
  templateUrl: './event-context.component.html',
  styleUrls: ['./event-context.component.css']
})
export class EventContextComponent {
	
	public currentAction: Action = 'read'
	
	@Input()
	public day!: number

	@Input()
	public month!: number

  @Input()
  public year!: number

	@Input()
	public events!: CalendarEvent[]

	@Output()
	public eventListChanged = new EventEmitter<void>()

	private eventService: EventService

	constructor() {
		this.eventService = new EventService()
    this.eventService.setEventProp('day', this.day)
    this.eventService.setEventProp('month', this.month)
    this.eventService.setEventProp('year', this.year)
	}

	// lista de eventos ativados pelos componentes-filhos
	private changeCurrentAction(action: Action) {
		this.currentAction = action
	}

	public getEventData(): EventService {
		return this.eventService
	}

	public getEventId(): number {
		return this.eventService.getEventProp('id')
	}

	public onStartAdd() { this.changeCurrentAction('add') }

	public onStartEdit(event: CalendarEvent) {
		this.eventService.setEventProps(event)
		this.changeCurrentAction('edit')
	}

	public onStartDelete(event: CalendarEvent) {
		const num = event.id as number
		this.eventService.setEventProp('id', num)
		this.changeCurrentAction('delete')
	}

	// volta para modo leitura e pede para a lista recarregar os eventos
	public onActionFinished() {
        this.eventService.resetEventData()
		this.changeCurrentAction('read')
		this.eventListChanged.emit()
	}
}
