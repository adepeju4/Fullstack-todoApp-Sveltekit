import type { RequestHandler } from '@sveltejs/kit';
import { catchAsync } from '../../../../../hooks.server';
import { Todo } from '../../../../../sequelize/models/todo.model';
import { UserError } from '../../../../../utils/ErrorHandler';
import { sendSvelteKitResponse } from '../../../../../utils/sendResponse';
import { validateUpdateTodo } from '../../../../../utils/validators';

export const PATCH: RequestHandler = catchAsync(async ({ request, params }) => {
	const { todoId } = params;

	if (typeof todoId !== 'string' || !todoId) throw new UserError('No todoId or Invalid todoId');

	const { error, value } = validateUpdateTodo(await request.json());
	if (error) throw new Error(error.message);

	const foundTodo = await Todo.findByPk(todoId);

	if (!foundTodo) throw new Error('Not Found');

	const todo = await Todo.update(value, { where: { id: todoId } });

	return sendSvelteKitResponse({
		message: 'Success!',
		data: todo,
		statusCode: 200
	});
});
