import { Request, Response } from 'express';
import EventService from '../services/eventService.ts';
import EventRepository from '../repositories/eventRepository.ts';
import UserEventService from '../services/userEventService.ts';
import UserEventRepository from '../repositories/userEventRepository.ts';

const eventService = new EventService(new EventRepository());
const userEventService = new UserEventService(new UserEventRepository());

class EventController {
	async create(req: Request, res: Response) {
		try {
			const event = await eventService.createEvent(req.body);

			Object.assign(req.body, { eventId: event.id })
      await userEventService.addEventToUser(req.body);

			res.status(201).json(event);

		} catch (error: any) {
			res.status(error?.cause?.code ? error.cause.code : 500).json({ error: error.message });
		}
	}

	async get(req: Request, res: Response) {
		try {
			const token = req.query.token as string
			const events = await eventService.getEvents(token);
			res.status(200).json(events);

		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const event = await eventService.getEvent(req.params.id);
			res.status(200).json(event);

		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const event = await eventService.updateEvent(req.params.id, req.body);
			res.status(200).json(event);

		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			await eventService.deleteEvent(req.params.id);

			const token = req.query.token as string
			await userEventService.removeEventFromUser({ userToken: token, eventId: req.params.id });
			
			res.status(204).send();

		} catch (error: any) {
			res.status(error?.cause?.code ? error.cause.code : 500).json({ error: error.message });
		}
	}
}

export default new EventController;
