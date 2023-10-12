import bcrypt from 'bcrypt';
import { validateRegister } from '../../../../utils/validators';
import { User } from '../../../../sequelize/models/user.model';
import { generateToken } from '../../../../utils/generateToken';
import type { RequestHandler } from '@sveltejs/kit';
import { ServerError, UserError } from '../../../../utils/ErrorHandler';
import { sendSvelteKitResponse } from '../../../../utils/sendResponse';
import { catchAsync } from '../../../../hooks.server';

export const POST: RequestHandler = catchAsync(async ({ request }) => {
	const data = await request.json();
	const { error, value } = validateRegister(data);

	if (error) throw new UserError(error.message);

	const { firstName, lastName, email, password } = value;

	const findUser = await User.findOne({ where: { email } });

	if (findUser) {
		throw new UserError('Account already exists, please login.');
	}

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	if (hash) {
		const newUser = new User({ firstName, lastName, email, password: hash });
		const savedUser = await newUser.save();

		if (savedUser) {
			const token = generateToken(savedUser);
			const userData = {
				firstName: savedUser.firstName,
				lastName: savedUser.lastName,
				email: savedUser.email
			};
			return sendSvelteKitResponse({
				statusCode: 200,

				data: {
					token,
					id: savedUser.id,
					...userData
				},
				message: 'Signup Successful',
				headers: {'set-cookie': `TDtoken=${token}; HttpOnly; SameSite=Strict; Path=/`}
			});
		}
	}
	throw new ServerError('Internal Server Error');
});
