import { Box, Button, Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useInputState } from '../../hooks/useInputState';
import { createPhoto, getPhotos } from '../../redux';

const FileInput = ({ selectedImage, setSelectedImage }) => {
	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		if (selectedImage) {
			setImageUrl(URL.createObjectURL(selectedImage));
		}
	}, [selectedImage]);

	return (
		<>
			<input
				accept='image/*'
				type='file'
				id='select-image'
				style={{ display: 'none' }}
				onChange={(e) => setSelectedImage(e.target.files[0])}
			/>
			<label htmlFor='select-image'>
				<Button variant='contained' color='primary' component='span'>
					Upload Image
				</Button>
			</label>
			{imageUrl && selectedImage && (
				<Box mt={2} textAlign='center'>
					<div>Image Preview:</div>
					<img src={imageUrl} alt={selectedImage.name} height='200px' />
				</Box>
			)}
		</>
	);
};

const CreateNewPhoto = () => {
	const [caption, changeCaption, resetCaption] = useInputState('');
	const [selectedImage, setSelectedImage] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPhotos());
	}, [dispatch]);
	const handleSubmit = async () => {
		const counterRes = await dispatch(createPhoto({ file: selectedImage, caption }));
		if (counterRes) {
			navigate('/dashboard');
		}
		resetCaption();
		setSelectedImage(null);
	};
	return (
		<div className='CreateNewPhoto'>
			<h1>Upload New Photo</h1>
			<Box
				component='form'
				sx={{
					'& > :not(style)': { m: 1, width: '35ch' },
				}}
				display='flex'
				justifyContent='center'
				alignItems='center'
				onSubmit={handleSubmit}
				className='Auth-outer-box'
				noValidate
				autoComplete='off'
			>
				<Stack spacing={5} direction='column'>
					<FileInput selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
					<TextField
						id='outlined-basic'
						label='Caption'
						variant='outlined'
						type='text'
						required
						value={caption}
						onChange={changeCaption}
					/>
					<Button onClick={handleSubmit} color='secondary' variant='contained'>
						Submit
					</Button>
				</Stack>
			</Box>
		</div>
	);
};

export default CreateNewPhoto;
