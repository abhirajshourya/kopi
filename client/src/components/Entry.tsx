import { Delete, Edit } from '@mui/icons-material';
import { Card, CardActions, CardContent, CardHeader, Chip, Grid, IconButton } from '@mui/material';
import { deleteEntry } from '../routes/routes';
import { TimeEntryModel } from '../App';
import React from 'react';

interface EntryProps {
	id?: string;
	tag: string;
	createdAt?: string;
	duration: string;
	setEntries: React.Dispatch<React.SetStateAction<TimeEntryModel[]>>;
}

function Entry({ tag, duration, id, setEntries }: EntryProps) {
	return (
		<Card variant="outlined" sx={{ display: 'flex', alignItems: 'center', width: '25em' }}>
			<Grid container>
				<Grid item sm={6}>
					<CardHeader title={duration} />
				</Grid>
				<Grid item sm={3}>
					<CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
						<Chip label={tag} />
					</CardContent>
				</Grid>
				<Grid item sm={3}>
					<CardActions disableSpacing>
						<IconButton aria-label="edit">
							<Edit />
						</IconButton>
						<IconButton
							aria-label="delete"
							onClick={() => {
								deleteEntry(id);
								setEntries((entries: TimeEntryModel[]) => {
									return entries.filter((entry) => entry.id !== id);
								});
							}}
						>
							<Delete />
						</IconButton>
					</CardActions>
				</Grid>
			</Grid>
		</Card>
	);
}

export default Entry;
