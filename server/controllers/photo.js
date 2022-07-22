import { StatusCodes } from 'http-status-codes';
import { deleteImageFromS3, uploadImageToS3 } from '../helpers/imageUpload.js';
import { handleError, handleSuccess } from '../helpers/responseHandlers.js';
import { Photo } from '../models/Photo.js';
import { createPhotoValidator } from '../validations/photo.js';

export const createPhoto = async (req, res) => {
	const { error } = createPhotoValidator(req.body);
	if (error) return handleError({ res, status: StatusCodes.BAD_REQUEST, message: error.message });
	try {
		if (!req.file) {
			return handleError({
				res,
				status: StatusCodes.BAD_REQUEST,
				message: 'Image is not provided, please provide image',
			});
		}
		req.body.imageUrl = await uploadImageToS3(req);
		const photo = await Photo.create({
			...req.body,
			ownedBy: req.userId,
		});
		return handleSuccess({
			res,
			status: StatusCodes.CREATED,
			message: 'New photo has been added successfully',
			data: {
				photo,
			},
		});
	} catch (error) {
		return handleError({ res, message: error.message });
	}
};

export const getPhotos = async (req, res) => {
	try {
		const photos = await Photo.find({ ownedBy: req.userId });
		return handleSuccess({
			res,
			status: StatusCodes.OK,
			message: 'All of the photos of logged in user',
			data: {
				photos,
			},
		});
	} catch (error) {
		return handleError({ res, message: error.message });
	}
};

export const deletePhoto = async (req, res) => {
	try {
		const { photoId } = req.params;
		let photo = await Photo.findById(photoId);
		await deleteImageFromS3(photo);
		photo = await Photo.findByIdAndDelete(photoId);
		return handleSuccess({
			res,
			status: StatusCodes.OK,
			message: 'The photo has been deleted successfully',
			data: {
				photo,
			},
		});
	} catch (error) {
		return handleError({ res, message: error.message });
	}
};
