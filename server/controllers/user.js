import { StatusCodes } from 'http-status-codes';
import { User } from '../models/User.js';
import { userSigninValidator, userSignupValidator } from '../validations/user.js';
import { hashPassword, isPasswordMatching } from '../helpers/passwordOperations.js';
import { handleSuccess, handleError } from '../helpers/responseHandlers.js';
import { createJwt } from '../helpers/jwtOperations.js';

export const signupUser = async (req, res) => {
	const { error } = userSignupValidator(req.body);
	if (error) return handleError({ res, status: StatusCodes.BAD_REQUEST, message: error.message });
	try {
		req.body.password = await hashPassword(req.body.password);
		const user = await User.create(req.body);
		return handleSuccess({
			res,
			status: StatusCodes.CREATED,
			message: 'New user has been registered successfully',
			data: {
				token: createJwt({ userId: user.id }),
				fullname: user.fullname,
			},
		});
	} catch (error) {
		return handleError({ res, message: error.message });
	}
};

export const signinUser = async (req, res) => {
	const { error } = userSigninValidator(req.body);
	if (error) return handleError({ res, status: StatusCodes.BAD_REQUEST, message: error.message });
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user)
			return handleError({
				res,
				status: StatusCodes.NOT_FOUND,
				message: 'User with given email does not exist',
			});
		if (!(await isPasswordMatching(password, user.password)))
			return handleError({
				res,
				status: StatusCodes.UNAUTHORIZED,
				message: 'Passwords do not match',
			});
		return handleSuccess({
			res,
			status: StatusCodes.OK,
			message: 'User has been successfully logged in',
			data: {
				fullname: user.fullname,
				token: createJwt({ userId: user.id }),
			},
		});
	} catch (error) {
		return handleError({ res, message: error.message });
	}
};
