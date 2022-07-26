import {
	AppBar,
	Button,
	Link,
	Toolbar,
	Typography,
	Avatar,
	IconButton,
	Menu,
	MenuItem,
	ListItemIcon,
} from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { stringAvatar } from '../../helpers/createAvatar';
import { userLogout } from '../../redux';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const dispatch = useDispatch();
	const { fullname } = useSelector((state) => state.user);
	const navigate = useNavigate();

	const handleClickOpen = () => {
		navigate('/login');
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<AppBar
			position='static'
			color='default'
			elevation={0}
			sx={{
				borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
			}}
		>
			<Toolbar sx={{ flexWrap: 'wrap' }}>
				<Typography align='left' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
					<Link href='/'>Photo Gallery App</Link>
				</Typography>
				{fullname ? (
					<>
						<IconButton onClick={handleClick} sx={{ ml: 2 }}>
							<Avatar {...stringAvatar(fullname)} />
						</IconButton>
						<Menu
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={() => setAnchorEl(null)}
							onClick={() => setAnchorEl(null)}
							PaperProps={{
								elevation: 0,
								sx: {
									overflow: 'visible',
									filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
									mt: 1.5,
									'& .MuiAvatar-root': {
										width: 32,
										height: 32,
										ml: -0.5,
										mr: 1,
									},
									'&:before': {
										content: '""',
										display: 'block',
										position: 'absolute',
										top: 0,
										right: 14,
										width: 10,
										height: 10,
										bgcolor: 'background.paper',
										transform: 'translateY(-50%) rotate(45deg)',
										zIndex: 0,
									},
								},
							}}
							transformOrigin={{
								horizontal: 'right',
								vertical: 'top',
							}}
							anchorOrigin={{
								horizontal: 'right',
								vertical: 'bottom',
							}}
						>
							<MenuItem
								onClick={() => {
									dispatch(userLogout());
									navigate('/')
								}}
							>
								<ListItemIcon>
									<Logout fontSize='small' />
								</ListItemIcon>
								Logout
							</MenuItem>
						</Menu>
					</>
				) : (
					<Button onClick={handleClickOpen} variant='outlined' sx={{ my: 1, mx: 1.5 }}>
						Login
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
