import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';

import { clearToast } from '../../redux/toast/toast.actions';
import MuiAlert from '@mui/material/Alert';

export default function InfoBar() {
	const dispatch = useDispatch();
	const { isShowing, message, toastType } = useSelector((state) => state.toast);

	const handleClose = (reason) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch(clearToast());
	};

	// eslint-disable-next-line
	const action = (
		<>
			<Button color='secondary' size='small' onClick={handleClose}>
				UNDO
			</Button>
			<IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
				<CloseIcon fontSize='small' />
			</IconButton>
		</>
	);

	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
	});

	return (
		<div>
			<Snackbar
				open={isShowing}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert onClose={handleClose} severity={toastType} sx={{ width: '100%' }}>
					{message}
				</Alert>
			</Snackbar>
		</div>
	);
}
