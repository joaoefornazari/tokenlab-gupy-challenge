import GeneratedTokenRepositoryInterface from "../interfaces/generatedTokenRepositoryInterface.ts";
import GeneratedToken from "../models/generated-token.ts";

class generatedTokenRepository implements GeneratedTokenRepositoryInterface {
	/**
	 * Delete a user token register.
	 * @param token The token to be deleted.
	 */
	async delete(token: string): Promise<void> {
		try {
			await GeneratedToken.destroy({ where: { token } });
		} catch (error) {
			throw new Error(`Failed to delete token: ${error}`);
		}
	}
}

export default generatedTokenRepository;
