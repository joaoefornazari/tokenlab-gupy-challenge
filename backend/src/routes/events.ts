import { Router } from 'express';
const router = Router();

import EventController from '../http/controllers/eventController.ts';

// ROUTE: /events
 
/* GET events listing. */
router.get('/', EventController.get);

/* GET specific event. */
router.get('/:id', EventController.getById);

/* POST create event. */
router.post('/', EventController.create);

/* PUT update event. */
router.put('/:id', EventController.update);

/* DELETE event. */
router.delete('/:id', EventController.delete);

export default router;
