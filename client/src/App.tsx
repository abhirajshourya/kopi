import Tracker from './components/Tracker';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import Entry from './components/Entry';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

function App() {
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
					<Tracker />
				</Box>
				<Box sx={{ m: 2, display: 'flex', justifyContent: 'center' }}>
					<Grid container spacing={2}>
						<Grid item>
							<Entry title={"Work"} createdAt={'May 14, 2023'} duration={'10m 20s'} />
						</Grid>
					</Grid>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default App;
