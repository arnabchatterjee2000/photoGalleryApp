import {
	USER_AUTH_REQUEST,
	USER_AUTH_SUCCESS,
	USER_AUTH_FAILURE,
	USER_AUTH_LOGOUT,
} from './user.types';
import { getWithExpiry } from '../../helpers/localStorage';

const initialState = {
	loading: false,
	error: false,
	message: '',
	fullname: getWithExpiry('photo-gallery-user-fullname'),
	token: getWithExpiry('photo-gallery-user-token'),
	data: [],
};

const userReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case USER_AUTH_REQUEST:
			return {
				...state,
				loading: true,
			};
		case USER_AUTH_SUCCESS:
			return {
				...state,
				loading: false,
				error: false,
				message: 'User had been logged in successfully',
				token: payload.token,
				fullname: payload.fullname,
				isVerified: payload.isVerified,
			};
		case USER_AUTH_FAILURE:
			return {
				...state,
				loading: false,
				error: true,
				message: payload,
				token: null,
				fullname: null,
				isVerified: null,
			};
		case USER_AUTH_LOGOUT:
			return {
				...state,
				loading: false,
				error: false,
				message: 'Logged out successfully',
				token: null,
				fullname: null,
				isVerified: null,
			};
		default:
			return state;
	}
};

export default userReducer;
