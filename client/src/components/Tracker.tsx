import { useState } from 'react';
import { formatTimestamp } from '../utils/formatTime';
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
import { createEntry } from '../routes/routes';
import useTagInput from '../hooks/useTagInput';

interface TrackerProps {
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
function Tracker({ setRefresh }: TrackerProps) {
	const [duration, setDuration] = useState(0);
	const [isTrackerRunning, setIsTrackerRunning] = useState(false);
	// const [startTime, setStartTime] = useState(0);
	const [timerId, setTimerId] = useState(0);
	const [tag, setTag] = useTagInput('');

	let TimeTracked = {
		duration,
		title: tag,
	};

	function toggleTimeTracker() {
		if (isTrackerRunning) {
			TimeTracked = {
				...TimeTracked,
				duration: duration,
				title: tag,
			};
			setDuration(0);
			setTimerId(0);
			clearInterval(timerId);
			setIsTrackerRunning(false);
			setTag('');

			console.log(TimeTracked);

			createEntry(TimeTracked);

			setRefresh((prev) => !prev);
		} else {
			const startTimestamp = Date.now() - duration;
			const id = setInterval(() => {
				const currentDuration = Date.now() - startTimestamp;
				setDuration(currentDuration);
			}, 1000);
			// setStartTime(startTimestamp);
			setTimerId(id);
			setIsTrackerRunning(true);
		}
	}

	return (
		<Card raised={true} sx={{ width: '32em' }}>
			<Box sx={{ m: 2 }}>
				<CardContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100%',
					}}
				>
					<Typography variant="h2" component="h2">
						{formatTimestamp(duration)}
					</Typography>
					<Grid container justifyContent="center" alignItems={'flex-end'}>
						<Grid item>
							<TextField
								label="Tag"
								variant="standard"
								value={tag}
								onChange={(e) => {
									setTag(e.target.value);
								}}
								error={isTrackerRunning && !tag.length}
							/>
						</Grid>
						<Divider variant="middle" />
						<Grid item>
							<Button
								disabled={isTrackerRunning && !tag.length}
								sx={{ width: '10em' }}
								variant="outlined"
								onClick={toggleTimeTracker}
							>
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
