
import { catchAsync } from '../../../../hooks.server';
import { sendSvelteKitResponse } from '../../../../utils/sendResponse';

export const GET = catchAsync(async ({request}) => {
	
	return sendSvelteKitResponse({
		data: request.user,
		message: 'verified Successfully 🌟',
		statusCode: 200
	});
});
