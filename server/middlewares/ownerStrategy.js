import { StatusCodes } from 'http-status-codes';
import { handleError } from '../helpers/responseHandlers.js';
import { Photo } from '../models/Photo.js';

export const isOwner = async (req, res, next) => {
	const { photoId } = req.params;
	try {
		const photo = await Photo.findById(photoId);
		if (!photo.ownedBy.equals(req.userId))
			return handleError({
				res,
				status: StatusCodes.FORBIDDEN,
				message: 'Access denied',
			});
		next();
	} catch (error) {
		return handleError({
			res,
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			message: error.message,
		});
	}
};
