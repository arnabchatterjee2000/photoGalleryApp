import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPhoto, deletePhoto, getPhotos } from '../redux/photo/photo.actions';
import { userAuth } from '../redux/user/user.actions';

const Test = (props) => {
	const dispatch = useDispatch();
	const [file, setFile] = useState(null);
	const handleChange = (event) => {
		setFile(event.target.files[0]);
	};
	const handleImageUpload = async (event) => {
		event.preventDefault();
		const result = await dispatch(createPhoto({ file, caption: 'Sample_Caption_289' }));
		console.log(result);
	};
	const fetchPhotos = async () => {
		const result = await dispatch(getPhotos());
		console.log(result);
	};
	const removePhoto = async () => {
		const result = await dispatch(deletePhoto('62caeea03bf577bf09e857dd'));
		console.log(result);
	};
	const submitLoginCredentials = async () => {
		const result = await dispatch(
			userAuth({ email: 'abcxyz@gmail.com', password: 'password' })
		);
		console.log(result);
	};
	return (
		<div className='Test'>
			{file ? <img src={file} alt='Uploaded' /> : null}
			<form onSubmit={handleImageUpload}>
				<h1>React File Upload</h1>
				<input type='file' onChange={handleChange} />
				<button type='submit'>Upload</button>
			</form>
			<button onClick={fetchPhotos}>Photos</button>
			<button onClick={removePhoto}>Delete Photo</button>
			<button onClick={submitLoginCredentials}>Signin/Signup</button>
		</div>
	);
};

export default Test;
