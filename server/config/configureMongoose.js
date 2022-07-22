import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const configureMongoose = () => {
	const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/PhotoGalleryApp';

	mongoose.connect(
		DATABASE_URL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		},
		() => {
			console.log('Successfully connected to MongoDB');
		}
	);
};
