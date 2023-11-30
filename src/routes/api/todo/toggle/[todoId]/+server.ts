import type { RequestHandler } from '@sveltejs/kit';
import { catchAsync } from '../../../../../hooks.server';
import { Todo } from '../../../../../sequelize/models/todo.model';
import { NotFoundError, UserError } from '../../../../../utils/ErrorHandler';
import { sendSvelteKitResponse } from '../../../../../utils/sendResponse';

export const PATCH: RequestHandler = catchAsync(async ({ params }) => {
	const { todoId } = params;

	if (typeof todoId !== 'string' || !todoId) throw new UserError('No todoId or Invalid todoId');

	let todo = await Todo.findByPk(todoId);

	if (!todo) throw new NotFoundError('Not Found');
	const updatedStatus = !todo.completed;
	await Todo.update({ completed: updatedStatus }, { where: { id: todoId } });

	todo = await Todo.findByPk(todoId);

	return sendSvelteKitResponse({
		statusCode: 200,
		message: `Todo ${updatedStatus ? 'completed' : 'uncompleted'}`,
		data: todo
	});
});
