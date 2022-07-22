import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/User.js';
import { handleError } from '../helpers/responseHandlers.js';

export const authProtection = async (req, res, next) => {
	try {
		const token = req.header('Authorization').split(' ')[1];
		if (!token) {
			return handleError({
				res,
				status: StatusCodes.FORBIDDEN,
				message: 'Access denied',
			});
		}
		const verifiedUser = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
		req.userId = (await User.findById(verifiedUser.userId))._id;
		next();
	} catch (error) {
		if (error instanceof TypeError) {
			return handleError({
				res,
				status: StatusCodes.BAD_REQUEST,
				message: "Didn't receive JSON Web Token for authorization",
			});
		}
		return handleError({
			res,
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			message: error.message,
		});
	}
};
