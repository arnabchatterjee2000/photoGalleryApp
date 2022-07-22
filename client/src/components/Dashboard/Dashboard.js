import React, { useEffect } from 'react';
import './Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotos } from '../../redux';
import PhotoCard from '../Card/Card';
import { Fab, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const Dashboard = (props) => {
	const { token } = useSelector((state) => state.user);
	const { data: photos } = useSelector((state) => state.photo);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		if (token === null) navigate('/login');
		dispatch(getPhotos());
	}, [dispatch]);
	return (
		<div className='Dashboard'>
			<div className='Dashboard-photo-list'>
				<Grid container spacing={3}>
					{photos ? (
						photos.map((aPhoto) => (
							<Grid item xs={4} key={aPhoto._id} className='Dashboard-photo'>
								<PhotoCard {...aPhoto} />
							</Grid>
						))
					) : (
						<Grid item xs={12}>
							<PhotoCard caption={'No Image Found'} />
						</Grid>
					)}
				</Grid>
			</div>
			<Fab
				className='fab'
				variant='extended'
				color='secondary'
				aria-label='add'
				onClick={() => {
					navigate('/create-new');
				}}
			>
				<AddIcon sx={{ mr: 1 }} />
				Add Image
			</Fab>
		</div>
	);
};

export default Dashboard;
