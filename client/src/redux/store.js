import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import photoReducer from './photo/photo.reducer';
import userReducer from './user/user.reducer';
import toastReducer from './toast/toast.reducer';

const rootReducer = combineReducers({
	user: userReducer,
	photo: photoReducer,
	toast: toastReducer,
});

const store = configureStore({
	reducer: rootReducer,
	devTools: composeWithDevTools,
	middleware: [logger, thunk],
});

export default store;
