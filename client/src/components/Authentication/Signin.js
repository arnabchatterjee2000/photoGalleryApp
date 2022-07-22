import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useInputState } from '../../hooks/useInputState';
import { useDispatch, useSelector } from 'react-redux';
import { showToastTimer, userAuth } from '../../redux';
import './styles.css';

const Signin = (props) => {
	const [email, changeEmail, resetEmail] = useInputState('');
	const [password, changePassword, resetPassword] = useInputState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, message } = useSelector((state) => state.user);
	useEffect(() => {
		if (error) {
			dispatch(showToastTimer(message, 'error'));
		}
	}, [error, message]);
	const handleSubmit = async () => {
		const counterRes = await dispatch(userAuth({ email, password }));
		if (counterRes) {
			navigate('/dashboard');
		}
		resetEmail();
		resetPassword();
	};
	return (
		<div className='Auth-root'>
			<div className='Auth-right'>
				<div>
					<p className='Auth-title'>Signin</p>
					<p>
						Don't have an account ? <Link to='/register'>Create One</Link>
					</p>
					<Box
						component='form'
						sx={{
							'& > :not(style)': { m: 1, width: '35ch' },
						}}
						className='Auth-outer-box'
						noValidate
						autoComplete='off'
					>
						<Stack spacing={4} direction='column'>
							<TextField
								id='email'
								label='Email'
								variant='outlined'
								type='email'
								value={email}
								onChange={changeEmail}
							/>
							<TextField
								id='password'
								label='Password'
								variant='outlined'
								type='password'
								value={password}
								onChange={changePassword}
							/>
							<Button onClick={handleSubmit} variant='contained'>
								Signin
							</Button>
						</Stack>
					</Box>
				</div>
			</div>
		</div>
	);
};

export default Signin;
