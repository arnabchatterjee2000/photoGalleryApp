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

const initialState = {
	loading: false,
	error: false,
	message: '',
	data: [],
};

const photoReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case FETCH_PHOTO_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_PHOTO_SUCCESS:
			return {
				loading: false,
				error: false,
				message: payload.message,
				data: payload.photos,
			};
		case FETCH_PHOTO_FAILURE:
			return {
				loading: false,
				error: true,
				message: payload.errorMessage,
				data: [],
			};
		case CREATE_PHOTO_REQUEST:
			return {
				...state,
				loading: true,
			};
		case CREATE_PHOTO_SUCCESS: {
			return {
				...state,
				loading: false,
				error: false,
				message: payload.message,
				data: payload.photos,
			};
		}
		case CREATE_PHOTO_FAILURE:
			return {
				...state,
				loading: false,
				error: true,
				message: payload.errorMessage,
			};
		case DELETE_PHOTO_REQUEST:
			return {
				...state,
				loading: true,
			};
		case DELETE_PHOTO_SUCCESS:
			return {
				...state,
				loading: false,
				error: false,
				message: payload.message,
				data: payload.photos,
			};
		case DELETE_PHOTO_FAILURE:
			return {
				...state,
				loading: false,
				error: true,
				message: payload.errorMessage,
			};
		default:
			return state;
	}
};

export default photoReducer;
