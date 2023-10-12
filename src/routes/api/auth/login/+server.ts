import bcrypt from 'bcrypt';
import { validateLogin } from '../../../../utils/validators';
import { User } from '../../../../sequelize/models/user.model';
import { generateToken } from '../../../../utils/generateToken';
import type { RequestHandler } from '@sveltejs/kit';
import { sendSvelteKitResponse } from '../../../../utils/sendResponse';
import { UserError } from '../../../../utils/ErrorHandler';
import { catchAsync } from '../../../../hooks.server';

export const POST: RequestHandler = catchAsync( async ({ request }) => {
	const data = await request.json();
	const { error, value } = validateLogin(data);

	if (error) throw new UserError(error.message);

	const { email, password } = value;

	const user = await User.findOne({ where: { email } });

	if (user && bcrypt.compareSync(password, user.password)) {
		const token = generateToken(user);
		const userData = {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email
		};

		return sendSvelteKitResponse({
			data: {
				_id: user.id,
				...userData,
				token
			},
			message: 'Login Successful',
			statusCode: 200,
			headers: {'set-cookie': `TDtoken=${token}; HttpOnly; SameSite=Strict; Path=/`}
		});
	}

	throw new UserError('Incorrect email or password');
});


