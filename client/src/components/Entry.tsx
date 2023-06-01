import { Delete, Edit } from '@mui/icons-material';
import { Card, CardActions, CardHeader, Chip, Grid, IconButton } from '@mui/material';
import { deleteEntry } from '../routes/routes';
import { TimeEntryModel } from '../common/TimeEntryModel';
import React from 'react';
import EditDialog from './EditDialog';
import { convertToTimestamp } from '../utils/formatTime';

interface EntryProps {
	id: string;
	tag: string;
	createdAt?: string;
	duration: string;
	setEntries: React.Dispatch<React.SetStateAction<TimeEntryModel[]>>;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

function Entry({ tag, duration, id, setEntries, setRefresh }: EntryProps) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Card
			variant="outlined"
			sx={{ display: 'flex', alignItems: 'center', width: '25em' }}
			// onClick={handleClickOpen}
		>
			<Grid container>
				<Grid item sm={6}>
					<CardHeader title={duration} sx={{ height: '100%' }} />
				</Grid>
				<Grid
					item
					sm={3}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignContent: 'center',
						flexDirection: 'column',
					}}
				>
					<Chip label={tag} />
				</Grid>
				<Grid item sm={3}>
					<CardActions disableSpacing sx={{ height: '100%' }}>
						<IconButton aria-label="edit" onClick={handleClickOpen}>
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
			{open && (
				<EditDialog
					open={open}
					handleClose={handleClose}
					id={id}
					tag={tag}
					duration={convertToTimestamp(duration)}
					setRefresh={setRefresh}
				/>
			)}
		</Card>
	);
}

export default Entry;
