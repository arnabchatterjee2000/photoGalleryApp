import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import Signin from '../Authentication/Signin';
import Signup from '../Authentication/Signup';
import CreateNewPhoto from '../CreateNewPhoto/CreateNewPhoto';
import Dashboard from '../Dashboard/Dashboard';
import Landing from '../Landing/Landing';

const Routes = (props) => {
	return (
		<Switch>
			<Route exact path='/' element={<Landing />} />
			<Route exact path='/dashboard' element={<Dashboard />} />
			<Route exact path='/login' element={<Signin />} />
			<Route exact path='/register' element={<Signup />} />
			<Route exact path='/create-new' element={<CreateNewPhoto />} />
		</Switch>
	);
};

export default Routes;
