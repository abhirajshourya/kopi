import { useState } from 'react';
import { formatTime } from '../utils/formatTime';
import {
	Button,
	Card,
	CardContent,
	Divider,
	Grid,
	TextField,
	Typography,
	Box,
} from '@mui/material';

function Tracker() {
	const [duration, setDuration] = useState(0);
	const [isTrackerRunning, setIsTrackerRunning] = useState(false);
	const [startTime, setStartTime] = useState(0);
	const [timerId, setTimerId] = useState(0);
	const [title, setTitle] = useState('');

	let TimeTracked = {
		duration,
		startTime,
		title,
	};

	function toggleTimeTracker() {
		if (isTrackerRunning) {
			TimeTracked = {
				...TimeTracked,
				duration: duration,
				startTime: startTime,
				title: title,
			};
			setDuration(0);
			setTimerId(0);
			clearInterval(timerId);
			setIsTrackerRunning(false);
			setTitle('');

			console.log(TimeTracked);
		} else {
			const startTimestamp = Date.now() - duration;
			const id = setInterval(() => {
				const currentDuration = Date.now() - startTimestamp;
				setDuration(currentDuration);
			}, 10);
			setStartTime(startTimestamp);
			setTimerId(id);
			setIsTrackerRunning(true);
		}
	}

	return (
		<Card variant="outlined" sx={{ width: '50em' }}>
			<Box sx={{ m: 2 }}>
				<CardContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100%', // Optional, adjust the height if needed
					}}
				>
					<Typography variant="h2" component="h2">
						{formatTime(duration)}
					</Typography>
					<Grid container justifyContent="center" alignItems={'flex-end'}>
						<Grid item>
							<TextField
								label="Title"
								variant="standard"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Grid>
						<Divider variant="middle" />
						<Grid item>
							<Button sx={{ width: '10em' }} variant="outlined" onClick={toggleTimeTracker}>
								{isTrackerRunning ? 'Stop' : 'Start'}
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Box>
		</Card>
	);
}

export default Tracker;
