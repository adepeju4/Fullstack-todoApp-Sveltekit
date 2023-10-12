import { Todo } from '../../../sequelize/models/todo.model';
import type { RequestHandler } from '@sveltejs/kit';
import { sendSvelteKitResponse } from '../../../utils/sendResponse';
import { validateCreateTodo } from '../../../utils/validators';
import { UserError } from '../../../utils/ErrorHandler';
import { catchAsync } from '../../../hooks.server';

export const GET: RequestHandler = catchAsync( async ({ request }) => {
	const todos = await Todo.findAll({ where: { userId: request.user.id } });

	return sendSvelteKitResponse({
		data: todos,
		statusCode: 200,
		message: "Fetched items successfully"
	});
});

export const POST: RequestHandler = catchAsync( async ({ request }) => {
	const { error, value } = validateCreateTodo(await request.json());

	if (error) throw new UserError(error.message);

	const todo = await Todo.create({ userId: request.user.id, ...value });

	return sendSvelteKitResponse({
		data: todo,
		statusCode: 200,
		message: "New item added to your list"
	});
});

