import type { RequestHandler } from '@sveltejs/kit';
import { sendSvelteKitResponse } from '../../../../utils/sendResponse';

export const POST: RequestHandler = async () => {
	return sendSvelteKitResponse({
		message: 'Logged out',
		statusCode: 200
	});
};
