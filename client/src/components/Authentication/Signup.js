import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useInputState } from '../../hooks/useInputState';
import { useDispatch, useSelector } from 'react-redux';
import { showToastTimer, userAuth } from '../../redux';
import { useEffect } from 'react';

const Signup = (props) => {
	const [fullName, changeFullName, resetFullName] = useInputState('');
	const [email, changeEmail, resetEmail] = useInputState('');
	const [password, changePassword, resetPassword] = useInputState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { error, message } = useSelector((state) => state.user);
	useEffect(() => {
		if (error) {
			dispatch(showToastTimer(message, 'error'));
		}
	}, [dispatch, error, message]);
	const handleSubmit = async () => {
		const counterRes = await dispatch(
			userAuth({ email, password, fullNameWhileRegistration: fullName })
		);
		if (counterRes) {
			navigate('/dashboard');
		}
		resetFullName();
		resetEmail();
		resetPassword();
	};
	return (
		<div className='Auth-root'>
			<div className='Auth-left' />
			<div className='Auth-right'>
				<div>
					<div>
						<p className='Auth-title'>Signup</p>
						<p>
							Have an account ? <Link to='/login'>Login</Link>
						</p>
					</div>
					<Box
						component='form'
						sx={{
							'& > :not(style)': { m: 1, width: '35ch' },
						}}
						onSubmit={handleSubmit}
						className='Auth-outer-box'
						noValidate
						autoComplete='off'
					>
						<Stack spacing={4} direction='column'>
							<TextField
								id='outlined-basic'
								label='Name'
								variant='outlined'
								type='text'
								value={fullName}
								onChange={changeFullName}
							/>
							<TextField
								id='outlined-basic'
								label='Email'
								variant='outlined'
								type='email'
								value={email}
								onChange={changeEmail}
							/>
							<TextField
								id='outlined-basic'
								label='Password'
								variant='outlined'
								type='password'
								value={password}
								onChange={changePassword}
							/>
							<Button onClick={handleSubmit} color='secondary' variant='contained'>
								Signup
							</Button>
						</Stack>
					</Box>
				</div>
			</div>
		</div>
	);
};

export default Signup;
