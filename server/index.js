import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes/index.js';
// import { configureMongoose } from './config/configureMongoose.js';

// Configuring our mongo database with mongoose
// configureMongoose();

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/PhotoGalleryApp';

mongoose
	.connect(DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Successfully connected to MongoDB');
	})
	.catch((error) => {
		console.log(error);
		console.log('Error while connecting to MongoDB');
	});

const app = express();

// Enabling cross origin resource sharing, for the time being keeping this origin accessible to all kinds
app.use(cors());

// Enabling the default body parser of express for dealing with data inside request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This is our base route, for the time being considering this to be the first version of our backend server API's
app.use('/api/v1', routes);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
	console.log(`Server is up and running at http://localhost:${PORT}`);
});
