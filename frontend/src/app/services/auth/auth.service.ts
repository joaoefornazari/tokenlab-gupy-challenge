import { Injectable } from "@angular/core";
import AuthServiceInterface from "./auth.interface";

@Injectable({
	providedIn: 'root'
})
export default class AuthService implements AuthServiceInterface {

	constructor() {}

	public isAuthenticated(): boolean {
		const cookie = document.cookie
		const token = cookie.match(/token=[^;]*/)
		
		if (!!token) {
			return true
		} else {
			window.location.href = '/calendar/login'
			return false
		}
	}

}
