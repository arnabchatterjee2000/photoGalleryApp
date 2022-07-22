import multer from 'multer';
import path from 'path';

import Aws from 'aws-sdk';

const storage = multer.memoryStorage();

const MAX_SIZE = 5 * 1000 * 1000;

export const uploadImage = multer({
	storage,
	limits: { fileSize: MAX_SIZE },
	fileFilter: (req, file, cb) => {
		const acceptedFileTypes = /jpeg|jpg|png/;
		const acceptedMimetype = acceptedFileTypes.test(file.mimetype);
		const extname = acceptedFileTypes.test(path.extname(file.originalname).toLowerCase());
		if (acceptedMimetype && extname) {
			return cb(null, true);
		}
		cb('Error: File upload only supports the ' + 'following filetypes - ' + acceptedFileTypes);
	},
}).single('photo');

const s3 = new Aws.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
});

export const uploadImageToS3 = async (req) => {
	const params = {
		Bucket: process.env.AWS_BUCKET_NAME, // bucket that we made earlier
		Key: `${Date.now()} - ${req.file.originalname}`, // Name of the image
		Body: req.file.buffer, // Body which will contain the image in buffer format
		ACL: 'public-read-write', // defining the permissions to get the public link
		ContentType: 'image/jpeg', // Necessary to define the image content-type to view the photo in the browser with the link
	};
	const data = await s3.upload(params).promise();
	return data.Location;
};

export const deleteImageFromS3 = async (photo) => {
	const uniqueKey = photo.imageUrl.split('/').splice(-1)[0];
	const data = await s3
		.deleteObject({
			Bucket: process.env.AWS_BUCKET_NAME,
			Key: uniqueKey,
		})
		.promise();
	return data;
};
