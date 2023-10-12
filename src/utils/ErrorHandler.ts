import type { RequestHandler } from '@sveltejs/kit';
import { sendSvelteKitResponse } from './sendResponse';

interface ErrorHandlerParams {
	error: Error;
}

class ErrorObject extends Error {
	statusCode: number;
	constructor(public name: string, statusCode: number) {
		super();
		this.statusCode = statusCode;
	}
}

export class UserError extends ErrorObject {
	constructor(message: string) {
		super('USER_ERROR', 400);
		this.message = message;
	}
}

export class UnauthorizedError extends ErrorObject {
	constructor(message: string) {
		super('AUTH_ERROR', 401);
		this.message = message;
	}
}

export class ForbiddenError extends ErrorObject {
	constructor(message: string) {
		super('FORBIDDEN_ERROR', 403);
		this.message = message;
	}
}

export class NotFoundError extends ErrorObject {
	constructor(message: string) {
		super('NOT_FOUND_ERROR', 404);
		this.message = message;
	}
}

export class DuplicateResourceError extends ErrorObject {
	constructor(message: string) {
		super('DUPLICATE_RESOURCE_ERROR', 409);
		this.message = message;
	}
}

export class ValidationError extends ErrorObject {
	constructor(message: string) {
		super('VALIDATION_ERROR', 422);
		this.message = message;
	}
}

export class ServerError extends ErrorObject {
	constructor(message: string) {
		super('SERVER_ERROR', 500);
		this.message = message;
	}
}

export class DatabaseError extends ErrorObject {
	constructor(message: string) {
		super('DATABASE_ERROR', 503);
		this.message = message;
	}
}

export const NotFoundErrorHandler: RequestHandler = async () => {
	throw new NotFoundError('Resource not found.');
};

export const ServerErrorHandler = async ({ error }: ErrorHandlerParams) => {
	if (error instanceof ErrorObject) {
		const { statusCode, message } = error;

		return sendSvelteKitResponse({ statusCode, message });
	}

	return sendSvelteKitResponse({ statusCode: 500, message: 'Internal Server Error' });
};
