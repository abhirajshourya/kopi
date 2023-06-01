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
