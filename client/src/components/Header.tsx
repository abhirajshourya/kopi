import React from 'react';
import { Box, IconButton, Theme, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { darkTheme, lightTheme } from '../common/theme';

interface HeaderProps {
	theme: Theme;
	setTheme: (updateTheme: (prevMode: Theme) => Theme) => void;
}

const Header = ({ setTheme, theme }: HeaderProps) => {
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setTheme((prevMode: Theme) => (prevMode === darkTheme ? lightTheme : darkTheme));
			},
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);
	return (
		<Box sx={{ m: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
			<Typography variant="h4" component="h4">
				Kopi
			</Typography>
			<Box sx={{ width: '100%' }} />
			<IconButton onClick={colorMode.toggleColorMode} color="inherit">
				{theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
			</IconButton>
		</Box>
	);
};

export default Header;
