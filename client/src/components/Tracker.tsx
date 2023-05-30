import { useState } from 'react';
import { formatTime } from '../utils/formatTime';
import { Button, Card, Grid, Input, Typography } from '@mui/material';

function Tracker() {
	const [duration, setDuration] = useState(0);
	const [isTrackerRunning, setIsTrackerRunning] = useState(false);
	const [startTime, setStartTime] = useState(0);
	const [timerId, setTimerId] = useState(0);

	let TimeTracked = {
		duration,
		startTime,
	};

	function toggleTimeTracker() {
		if (isTrackerRunning) {
			TimeTracked = {
				...TimeTracked,
				duration: duration,
				startTime: startTime,
			};
			clearInterval(timerId);
			setIsTrackerRunning(false);
			setDuration(0);
			setTimerId(0);

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
		<Card variant="outlined">
			<Grid container spacing={2} alignItems="center" justifyContent="center">
				<Grid item xs={6}>
					<Typography gutterBottom variant="h4" component="div">
						{formatTime(duration)}
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Input />
					<Button variant="outlined" onClick={toggleTimeTracker}>
						{isTrackerRunning ? 'Stop' : 'Start'}
					</Button>
				</Grid>
			</Grid>
		</Card>
	);
}

export default Tracker;
