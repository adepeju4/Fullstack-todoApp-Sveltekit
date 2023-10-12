import jwt from 'jsonwebtoken';
import { dbConn } from '$lib/server/database';

import { UnauthorizedError } from './utils/ErrorHandler';
import { User, type UserInstance } from './sequelize/models/user.model';
import type { Handle, RequestHandler } from '@sveltejs/kit';

import { json } from '@sveltejs/kit';

const excludedPaths: Record<string, boolean> = {
	'/auth/login': true,
	'/auth/signup': true,
	'/api/auth/login': true,
	'/api/auth/signup': true
};

export const catchAsync = (handler: RequestHandler): RequestHandler => {
	return async (request) => {
		try {
			return await handler(request);
		} catch (error) {
			const err = error as { message?: string; statusCode?: number };

			return json({ message: err.message }, { status: err.statusCode });
		}
	};
};

export const handle: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname;
	await dbConn();

	const excluded = excludedPaths[path];

	if (!excluded) {
		const { headers } = event.request;
		const cookies = parseCookies(headers.get('cookie') ?? '');

		if (cookies) {
			let token = cookies.TDtoken;

			try {
				if (token) {
					token = token.trim();

					const data = jwt.verify(token, import.meta.env.VITE_DB_SECRET!);

					if (typeof data === 'string') {
						throw new Error('Something went wrong');
					}

					const user = await User.findOne({
						where: { email: data.email, id: data.id || data._id }
					});

					if (!user) {
						throw new UnauthorizedError('Token is incorrect');
					}

					if (user) {
						event.locals.user = user.toJSON() as UserInstance;
						event.request.user = user.toJSON();
						return await resolve(event);
					}
				}
			} catch (e) {
				console.log(e);
			}
		}

		return await resolve(event);
	}

	return await resolve(event);
};

function parseCookies(cookieHeader: string): Record<string, string> {
	const cookies: Record<string, string> = {};
	const cookieArray = cookieHeader.split(';');
	cookieArray.forEach((cookie) => {
		const [key, value] = cookie.split('=').map((part) => part.trim());
		cookies[key] = value;
	});
	return cookies;
}

export const handleError = ({
	error
}: Parameters<import('@sveltejs/kit').HandleServerError>[0]) => {
	const err = error as { message: string; statusCode: number };

	console.log(err, 'status code');
	return {
		message: err.message,
		code: err.statusCode
	};
};
