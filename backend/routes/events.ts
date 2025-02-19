import { Router } from 'express';
const router = Router();

import EventController from '../src/http/controllers/eventController';
import EventService from '../src/http/services/eventService';

// ROUTE: /events
const eventController = new EventController(new EventService());
 
/* GET events listing. */
router.get('/', eventController.get);

/* GET specific event. */
router.get('/:id', eventController.getById);

/* POST create event. */
router.post('/', eventController.create);

/* PUT update event. */
router.put('/:id', eventController.update);

/* DELETE event. */
router.delete('/:id', eventController.delete);

export default router;
