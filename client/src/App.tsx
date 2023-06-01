import Tracker from './components/Tracker';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import Entry from './components/Entry';
import { useEffect, useState } from 'react';
import { getEntries } from './routes/routes';
import { formatTimestamp } from './utils/formatTime';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

export interface TimeEntryModel {
	id?: string;
	title: string;
	duration: number;
}

function App() {
	const [entries, setEntries] = useState<TimeEntryModel[]>([]);
	const [refresh, setRefresh] = useState(true);

	useEffect(() => {
		const getTimeEntries = async () => {
			const data = await getEntries();
			setEntries(data);
			console.log(data);
		};
		getTimeEntries();
	}, [refresh]);

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Box sx={{ m: 2 }}>
				<Typography variant="h4" component="h4">
					Kopi
				</Typography>
			</Box>
			<Divider variant="middle" />
			<Container sx={{ width: '40em' }}>
				<Box sx={{ m: 2, display: 'flex', justifyContent: 'center' }}>
					<Tracker setRefresh={setRefresh}/>
				</Box>
				<Box sx={{ m: 2, display: 'flex', justifyContent: 'center' }}>
					<Grid container spacing={2}>
						{entries &&
							entries.map((entry: TimeEntryModel) => (
								<Grid item key={entry.id}>
									<Entry
										key={entry.id}
										id={entry.id}
										tag={entry.title}
										duration={formatTimestamp(entry.duration)}
										setEntries={setEntries}
									/>
								</Grid>
							))}
					</Grid>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default App;
