import React from 'react';
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
import { useTracker } from '../hooks/useTracker';

interface TrackerProps {
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

function Tracker({ setRefresh }: TrackerProps) {
	const { duration, isTrackerRunning, tag, setTag, toggleTimeTracker } = useTracker(setRefresh);

	return (
		<Card raised={true} sx={{ width: '32em' }}>
			<Box sx={{ m: 2, height: '100%' }}>
				<CardContent>
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<Typography variant="h2" component="h2">
							{formatTimestamp(duration)}
						</Typography>
					</Box>
					<Divider variant="middle" />
					<Grid container alignItems="center" justifyContent="space-evenly" marginTop="1em">
						<Grid item>
							<TextField
								label="Tag"
								size="small"
								variant="outlined"
								value={tag}
								onChange={(e) => {
									setTag(e.target.value);
								}}
								error={isTrackerRunning && !tag.length}
							/>
						</Grid>
						<Grid item>
							<Button
								disabled={isTrackerRunning && !tag.length}
								sx={{ width: '8em' }}
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
