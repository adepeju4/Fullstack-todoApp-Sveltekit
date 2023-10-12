// See https://kit.svelte.dev/docs/types#app

import type { UserInstance } from "./sequelize/models/user.model";

export interface ISession {
	user: UserInstance;
}



// for information about these interfaces
declare global {
	namespace App {
		 interface Error {
			id?: string
			code: string;
			message: string;
		 }
		interface Locals {
			user?: UserInstance;
			db: unknown
		}

		interface LoadInput {
			session?: ISession;
		}

		// interface PageData {}
		// interface Platform {}
	}
	interface Request{
		user: UserInstance;
	}
}

export {};
