import {
	FETCH_PHOTO_REQUEST,
	FETCH_PHOTO_SUCCESS,
	FETCH_PHOTO_FAILURE,
	CREATE_PHOTO_REQUEST,
	CREATE_PHOTO_SUCCESS,
	CREATE_PHOTO_FAILURE,
	DELETE_PHOTO_REQUEST,
	DELETE_PHOTO_SUCCESS,
	DELETE_PHOTO_FAILURE,
} from './photo.types';
import axios from '../../helpers/axios';

export const fetchPhotoRequest = () => ({
	type: FETCH_PHOTO_REQUEST,
});

export const fetchPhotoSuccess = (photos, message) => ({
	type: FETCH_PHOTO_SUCCESS,
	payload: { photos, message },
});

export const fetchPhotoFailure = (errorMessage) => ({
	type: FETCH_PHOTO_FAILURE,
	payload: { errorMessage },
});

export const getPhotos = () => async (dispatch, getState) => {
	dispatch(fetchPhotoRequest());
	try {
		const {
			user: { token },
		} = getState();
		const response = await axios.get('/photos', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const { data: { photos }, message } = response.data;
		dispatch(fetchPhotoSuccess(photos, message));
		return true;
	} catch (error) {
		dispatch(fetchPhotoFailure(error.response.data.message));
		return false;
	}
};

export const createPhotoRequest = () => ({
	type: CREATE_PHOTO_REQUEST,
});

export const createPhotoSuccess = (photos, message) => ({
	type: CREATE_PHOTO_SUCCESS,
	payload: { photos, message },
});

export const createPhotoFailure = (errorMessage) => ({
	type: CREATE_PHOTO_FAILURE,
	payload: { errorMessage },
});

export const createPhoto =
	({ file, caption }) =>
	async (dispatch, getState) => {
		dispatch(createPhotoRequest());
		try {
			const {
				user: { token },
				photo: {
					data: photos,
				},
			} = getState();

			console.log(photos);

			const formData = new FormData();
			formData.append('photo', file);
			formData.append('caption', caption);

			const response = await axios.put('/photos/', formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			});
			const {
				message,
				data: { photo },
			} = response.data;
			const updatedPhotos = [...photos, photo];
			dispatch(createPhotoSuccess(updatedPhotos, message));
			return true;
		} catch (error) {
			console.log(error);
			dispatch(createPhotoFailure(error.response.data.message));
			return false;
		}
	};

export const deletePhotoRequest = () => ({
	type: DELETE_PHOTO_REQUEST,
});

export const deletePhotoSuccess = (photos, message) => ({
	type: DELETE_PHOTO_SUCCESS,
	payload: { photos, message },
});

export const deletePhotoFailure = (errorMessage) => ({
	type: DELETE_PHOTO_FAILURE,
	payload: { errorMessage },
});

export const deletePhoto = (photoId) => async (dispatch, getState) => {
	dispatch(deletePhotoRequest());
	try {
		const {
			user: { token },
			photo: {
				data: photos,
			},
		} = getState();
		const response = await axios.delete(`/photos/${photoId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const { message } = response.data;
		const updatedPhotos = photos.filter((aPhoto) => aPhoto._id !== photoId);
		dispatch(deletePhotoSuccess(updatedPhotos, message));
		return true;
	} catch (error) {
		console.log(error)
		dispatch(deletePhotoFailure(error.response.data.message));
		return false;
	}
};
