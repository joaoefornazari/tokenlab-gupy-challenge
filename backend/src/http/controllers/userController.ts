import { Request, Response } from 'express'
import UserService from '../services/userService.ts'
import UserRepository from '../repositories/userRepository.ts'
import generatedTokenRepository from '../repositories/generatedTokenRepository.ts';

const userService = new UserService(new UserRepository(), new generatedTokenRepository())

class UserController {
	async create(req: Request, res: Response) {
		try {
			const user = await userService.createUser(req.body);
			res.status(201).json(user);
		} catch (error: any) {
			res.status(error?.cause?.code ? error.cause.code : 500).json({ error: error.message });
		}
	}

	async get(req: Request, res: Response) {
		try {
			const user = await userService.getAllUsers();
			res.status(200).json(user);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			await userService.deleteUser(req.params.id);
			res.status(204).send();
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async login(req: Request, res: Response) {
    try {
			const token = await userService.getUserToLogin(req.body);
			res.status(200).json(token);
    } catch (error: any) {
			res.status(error?.cause?.code ? error.cause.code : 500).json({ error: error.message });
    }
	}

	async logout(req: Request, res: Response) {
		try {
			await userService.logoutUser(req.body);
			res.status(200).json();
    } catch (error: any) {
			res.status(error?.cause?.code ? error.cause.code : 500).json({ error: error.message });
    }
	}
}

export default new UserController;
