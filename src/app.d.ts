// See https://kit.svelte.dev/docs/types#app

import type { TodoAttributes } from './sequelize/models/todo.model';
import type { UserInstance } from './sequelize/models/user.model';

export interface ISession {
	user: UserInstance;
}

// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			id?: string;
			code: string;
			message: string;
		}
		interface Locals {
			user?: UserInstance;
			db: unknown;
		}

		interface LoadInput {
			session?: ISession;
		}

		// interface PageData {}
		// interface Platform {}
	}
	interface Request {
		user: UserInstance;
	}
}

type FetchOptions = {
	method?: string;
	queryParams?: Record<string, string>;
	body?: unknown;
};

type IFetchState<T> = {
	loading: boolean;
	error: Error | null;
	data: T | null;
};

interface IFetchResponse<T> {
	success: boolean;
	message: string;
	data: T;
}

type ITodoFetchResponse = IFetchResponse<TodoAttributes>;
type ITodosFetchResponse = IFetchResponse<TodoAttributes[]>;

type IUserFetchResponse = IFetchResponse<IUserAttributes>;

export {
	IFetchResponse,
	FetchOptions,
	IFetchState,
	ITodoFetchResponse,
	IUserFetchResponse,
	ITodosFetchResponse
};
