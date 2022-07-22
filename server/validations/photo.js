import Joi from 'joi';

const createPhotoValidationSchema = Joi.object({
	caption: Joi.string().required(),
});

export const createPhotoValidator = (body) => createPhotoValidationSchema.validate(body);
