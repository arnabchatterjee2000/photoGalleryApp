import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePhoto } from '../../redux';

export default function PhotoCard({ _id, imageUrl, caption, tags, createdAt }) {
	const dispatch = useDispatch();
	const handleDelete = async () => {
		await dispatch(deletePhoto(_id));
	};
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
						{caption.toUpperCase()[0]}
					</Avatar>
				}
				action={
					<IconButton aria-label='settings'>
						<MoreVertIcon />
					</IconButton>
				}
				title={caption}
				subheader={moment(createdAt).format('dddd, MMMM Do YYYY')}
			/>
			<CardMedia
				component='img'
				height='194'
				image={imageUrl}
				alt='Paella dish'
			/>
			<CardActions disableSpacing>
				<IconButton aria-label='delete image' onClick={handleDelete}>
					<DeleteIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}
