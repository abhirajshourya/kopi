import Tracker from './components/Tracker';
import { Theme, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Divider, Grid, IconButton, Typography } from '@mui/material';
import Entry from './components/Entry';
import { useEffect, useState } from 'react';
import { getEntries } from './routes/routes';
import { formatTimestamp } from './utils/formatTime';
import React from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});
const lightTheme = createTheme({
	palette: {
		mode: 'light',
	},
});

export interface TimeEntryModel {
	id?: string;
	tag: string;
	duration: number;
}

function App() {
	const [entries, setEntries] = useState<TimeEntryModel[]>([]);
	const [refresh, setRefresh] = useState<boolean>(true);
	const [theme, setTheme] = useState<Theme>(darkTheme);

	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setTheme((prevMode) => (prevMode === darkTheme ? lightTheme : darkTheme));
			},
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	useEffect(() => {
		const getTimeEntries = async () => {
			const data = await getEntries();
			setEntries(data);
			console.log(data);
		};
		getTimeEntries();
	}, [refresh]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box sx={{ m: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
				<Typography variant="h4" component="h4">
					Kopi
				</Typography>
				<Box sx={{ width: '100%' }} />
				<IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
					{theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
				</IconButton>
			</Box>
			<Divider variant="middle" />
			<Container sx={{ width: '40em' }}>
				<Box sx={{ m: 2, display: 'flex', justifyContent: 'center' }}>
					<Tracker setRefresh={setRefresh} />
				</Box>
				<Box sx={{ m: 2, display: 'flex', justifyContent: 'center' }}>
					<Grid container sx={{ marginTop: 0.5, display: 'flex', justifyContent: 'center' }}>
						{entries.length ? (
							entries.map((entry: TimeEntryModel) =>
								entry.id ? (
									<Grid item key={entry.id} sx={{ m: 0.5 }}>
										<Entry
											key={entry.id}
											id={entry.id}
											tag={entry.tag}
											duration={formatTimestamp(entry.duration)}
											setEntries={setEntries}
											setRefresh={setRefresh}
										/>
									</Grid>
								) : null
							)
						) : (
							<Typography variant="overline">press start to log time</Typography>
						)}
					</Grid>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default App;
