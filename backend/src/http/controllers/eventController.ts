import { Request, Response } from 'express';
import EventService from '../services/eventService';

class EventController {
	protected eventService: EventService;

	constructor(eventService: EventService) {
		this.eventService = eventService;
	}

	async create(req: Request, res: Response) {
		try {
			const event = this.eventService.createEvent(req.body);
			res.status(201).json(event);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async get(req: Request, res: Response) {
		try {
			const events = this.eventService.getEvents();
			res.status(200).json(events);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const event = this.eventService.getEvent(req.params.id);
			res.status(200).json(event);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const event = this.eventService.updateEvent(req.params.id, req.body);
			res.status(200).json(event);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			this.eventService.deleteEvent(req.params.id);
			res.status(204).send();
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}

export default EventController;
