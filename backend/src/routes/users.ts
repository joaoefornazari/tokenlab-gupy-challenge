import { Router } from 'express';
const router = Router();

import UserController from '../http/controllers/userController.ts';

// ROUTE: /users

/* GET all users */
router.get('', UserController.get)

/* POST create user. */
router.post('', UserController.create)

/* DELETE user. */
router.delete('/:id', UserController.delete)

/* POST login a user */
router.post('/login', UserController.login)

export default router;
