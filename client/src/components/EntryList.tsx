import { useEffect, useState } from 'react';
import { Grid, Theme, Typography } from '@mui/material';
import { getEntries } from '../routes/routes';
import Entry from './Entry';
import { formatTimestamp } from '../utils/formatTime';
import { TimeEntryModel } from '../common/TimeEntryModel';

interface EntryListProps {
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
	refresh: boolean;
	theme: Theme;
}

const EntryList = ({ refresh, setRefresh, theme }: EntryListProps) => {
	const [entries, setEntries] = useState<TimeEntryModel[]>([]);
	useEffect(() => {
		const getTimeEntries = async () => {
			const data = await getEntries();
			setEntries(data);
		};
		getTimeEntries();
	}, [refresh]);

	const List = entries.length ? (
		entries.map((entry: TimeEntryModel) =>
			entry.id ? (
				<Grid item key={entry.id} sx={{ m: 0.5 }}>
					<Entry
						theme={theme}
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
	);

	return (
		<Grid
			container
			sx={{ marginTop: 0.5, display: 'flex', alignContent: 'center', flexDirection: 'column' }}
		>
			{List}
		</Grid>
	);
};

export default EntryList;
