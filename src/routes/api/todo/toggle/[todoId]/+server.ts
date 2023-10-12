

import type { RequestHandler } from '@sveltejs/kit';
import { catchAsync } from '../../../../../hooks.server';
import { Todo } from '../../../../../sequelize/models/todo.model';
import { NotFoundError, UserError } from '../../../../../utils/ErrorHandler';
import { sendSvelteKitResponse } from '../../../../../utils/sendResponse';

export const PATCH: RequestHandler = catchAsync(async ({ params }) => {
	const { todoId } = params;

	if (typeof todoId !== 'string' || !todoId) throw new UserError('No todoId or Invalid todoId');

	const todo = await Todo.findByPk(todoId);
	if (!todo) throw new NotFoundError('Not Found');

	await Todo.update({ completed: !todo.completed }, { where: { id: todoId } });

	return sendSvelteKitResponse({
		statusCode: 200,
		message: `Todo completed: ${todo.completed}`,
		data: {
			...todo,
			completed:!todo.completed
		}
	});
});
