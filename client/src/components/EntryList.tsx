import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { getEntries } from '../routes/routes';
import Entry from './Entry';
import { formatTimestamp } from '../utils/formatTime';
import { TimeEntryModel } from '../common/TimeEntryModel';

interface EntryListProps {
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
	refresh: boolean;
}

const EntryList = ({ refresh, setRefresh }: EntryListProps) => {
	const [entries, setEntries] = useState<TimeEntryModel[]>([]);
	useEffect(() => {
		const getTimeEntries = async () => {
			const data = await getEntries();
			setEntries(data);
			console.log(data);
		};
		getTimeEntries();
	}, [refresh]);
	return (
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
	);
};

export default EntryList;
