import Joi from 'joi';

interface RegisterPayload {
	firstName: string;
	lastName: string;
	password: string;
	email: string;
}

interface LoginPayload {
	email: string;
	password: string;
}

interface CreateTodoPayload {
	title: string;
	description?: string;
	completed?: boolean;
}

interface UpdateTodoPayload {
	title?: string;
	description?: string;
	completed?: boolean;
}

export function validateRegister(value: RegisterPayload) {
	const registerSchema = Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		password: Joi.string().required(),
		email: Joi.string().email().required()
	});

	return registerSchema.validate(value, {
		allowUnknown: false
	});
}

export function validateLogin(value: LoginPayload) {
	const loginSchema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	});

	return loginSchema.validate(value, {
		allowUnknown: false
	});
}

export function validateCreateTodo(value: CreateTodoPayload) {
	const todoSchema = Joi.object({
		title: Joi.string().required(),
		description: Joi.string().allow('').optional(),
		completed: Joi.boolean().optional()
	});

	return todoSchema.validate(value, {
		allowUnknown: false
	});
}

export function validateUpdateTodo(value: UpdateTodoPayload) {
	const todoSchema = Joi.object({
		title: Joi.string().optional(),
		description: Joi.string().allow('').optional(),
		completed: Joi.boolean().optional()
	});

	return todoSchema.validate(value, {
		allowUnknown: false
	});
}
