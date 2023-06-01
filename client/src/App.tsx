import Tracker from './components/Tracker';
import { Theme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Divider } from '@mui/material';
import { useState } from 'react';
import Header from './components/Header';
import { darkTheme } from './common/theme';
import EntryList from './components/EntryList';
import { Styles } from './common/styles';

function App() {
	const [refresh, setRefresh] = useState<boolean>(true);
	const [theme, setTheme] = useState<Theme>(darkTheme);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Header setTheme={setTheme} theme={theme} />
			<Divider variant="middle" />
			<Container sx={{ width: '40em' }}>
				<Box sx={{ ...Styles.BoxCenter, ...Styles.Margin }}>
					<Tracker setRefresh={setRefresh} />
				</Box>
				<Box sx={{ ...Styles.BoxCenter, ...Styles.Margin }}>
					<EntryList refresh={refresh} setRefresh={setRefresh} />
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default App;
