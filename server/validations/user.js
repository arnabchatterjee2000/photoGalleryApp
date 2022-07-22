import Joi from 'joi';

const userSignupValidationSchema = Joi.object({
	fullname: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string().required(),
});

export const userSignupValidator = (body) => userSignupValidationSchema.validate(body);

const userSigninValidationSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required(),
});

export const userSigninValidator = (body) => userSigninValidationSchema.validate(body);
