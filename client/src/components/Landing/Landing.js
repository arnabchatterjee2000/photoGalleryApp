import React from 'react';
import './Landing.css';

import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Landing = (props) => {
	return (
		<div className='Landing'>
			<div>
				<p className='Landing-title'>Photo Gallery App</p>
				<div className='navigation-btns'>
					<Link to='/login'>
						<Button color='error' variant='contained'>
							Login
						</Button>
					</Link>
					<Link to='/dashboard'>
						<Button variant='contained'>Dashboard</Button>
					</Link>
					<Link to='/register'>
						<Button color='warning' variant='contained'>
							Register
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Landing;
