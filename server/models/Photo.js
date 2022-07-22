import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema(
	{
		imageUrl: {
			type: String,
			required: true,
		},
		caption: {
			type: String,
			required: true,
		},
		ownedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		tags: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Tag',
			},
		],
	},
	{ timestamps: true }
);

export const Photo = mongoose.model('Photo', PhotoSchema);
