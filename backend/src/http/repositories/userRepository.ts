import { UserRepositoryInterface } from "../interfaces/userRepositoryInterface.ts";
import User from "../models/user.ts";
import { compare } from "bcrypt";

class UserRepository implements UserRepositoryInterface {

	/**
	 * Get a specific user.
	 * @param id The user id.
	 * @returns The user data.
	 */
	async get(id: string): Promise<any | null> {
		try {
			const user = await User.findByPk(id);
			return user ? user.toJSON() : null;
		} catch (error) {
			throw new Error(`Failed to get user by id: ${error}`);
		}
	}

	/**
	 * Create a new user.
	 * @param user The user credentials.
	 * @returns A 'Success' message to avoid exposing data.
	 */
	async create(user: any): Promise<any> {
		try {
			const newUser = await User.create(user);
			return { message: 'success' }
		} catch (error) {
			throw new Error(`Failed to create user: ${error}`);
		}
	}

	/**
	 * Delete an user.
	 * @param id The user id.
	 */
	async delete(id: string): Promise<void> {
		try {
			await User.destroy({
				where: { id }
			});
		} catch (error) {
			throw new Error(`Failed to delete user: ${error}`);
		}
	}

	/**
	 * Get an user through its credentials.
	 * @param email The user email
	 * @param password The user password
	 */
	async getByCredentials(email: string, password: string) {
		try {
			const user = await User.findOne({
				where: {
					email: email,
				}
			});

			if (!user) {
				throw new Error('Not found.')
			}

			const isPasswordValid = await compare(password, user.get().password);

			if (!isPasswordValid) {
				throw new Error('Wrong password. Try again.');
			}

			return user ? user.toJSON() : null;
		} catch (error) {
			throw new Error(`Failed to get user by credentials: ${error}`);
		}
	}
}

export default UserRepository;
