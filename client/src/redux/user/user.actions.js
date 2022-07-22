import {
	USER_AUTH_REQUEST,
	USER_AUTH_SUCCESS,
	USER_AUTH_FAILURE,
	USER_AUTH_LOGOUT,
} from './user.types';
import axios from '../../helpers/axios';
import { setWithExpiry } from '../../helpers/localStorage';

const getUrlParamAndBodyData = ({ fullname, email, password }) => {
	const urlParam = `/users/${fullname ? 'signup' : 'signin'}`;
	const bodyData = { email, password };
	if (fullname) bodyData.fullname = fullname;
	return { urlParam, bodyData };
};

export const userAuthRequest = () => ({
	type: USER_AUTH_REQUEST,
});

export const userAuthSuccess = (token, fullname, isVerified) => ({
	type: USER_AUTH_SUCCESS,
	payload: {
		token,
		fullname,
		isVerified,
	},
});

export const userAuthFailure = (errorMessage) => ({
	type: USER_AUTH_FAILURE,
	payload: errorMessage,
});

export const userLogoutSuccess = () => ({
	type: USER_AUTH_LOGOUT,
});

export const userAuth =
	({ email, password, fullNameWhileRegistration = null }) =>
	async (dispatch) => {
		await dispatch(userAuthRequest());
		try {
			// eslint-disable-next-line no-use-before-define
			const { urlParam, bodyData } = getUrlParamAndBodyData({
				email,
				password,
				fullname: fullNameWhileRegistration,
			});
			const response = await axios.post(urlParam, { ...bodyData });
			const { fullname, token, isVerified } = response.data.data;
			setWithExpiry('photo-gallery-user-token', token);
			setWithExpiry('photo-gallery-user-fullname', fullname);
			await dispatch(userAuthSuccess(token, fullname, isVerified));
			return true;
		} catch (error) {
			console.log(error);
			await dispatch(userAuthFailure(error.response.data.message));
			return false;
		}
	};

export const userLogout = () => async (dispatch) => {
	dispatch(userLogoutSuccess());
	setWithExpiry('photo-gallery-user-token', null);
	setWithExpiry('photo-gallery-user-fullname', null);
};
