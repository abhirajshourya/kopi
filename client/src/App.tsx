import Tracker from './components/Tracker';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Divider, Typography } from '@mui/material';

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
			<Box sx={{ m: 2, display: 'flex', justifyContent: 'center' }}>
				<Tracker />
			</Box>
		</ThemeProvider>
	);
}

export default App;
