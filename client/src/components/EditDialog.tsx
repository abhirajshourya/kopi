import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { IconButton, TextField } from '@mui/material';
import useTagInput from '../hooks/useTagInput';
import { Save } from '@mui/icons-material';
import { updateEntry } from '../routes/routes';
import { TimeEntryModel } from '../App';

function PaperComponent(props: PaperProps) {
	return (
		<Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
}

interface DraggableDialogProps {
	open: boolean;
	handleClose: () => void;
	id: string;
	tag: string;
	duration: number;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditDialog({
	open,
	handleClose,
	id,
	tag,
	duration,
	setRefresh,
}: DraggableDialogProps) {
	const [tagValue, setTagValue] = useTagInput(tag);

	let TimeTracked: TimeEntryModel = {
		duration,
		tag,
	};

	const onSave = () => {
		TimeTracked = {
			...TimeTracked,
			tag: tagValue,
		};
		handleClose();
		updateEntry(id, TimeTracked);
		setRefresh((prev) => !prev);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperComponent={PaperComponent}
			aria-labelledby="draggable-dialog-title"
			maxWidth="xs"
			key={id}
		>
			<DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
				Edit Time Log
			</DialogTitle>
			<DialogContent sx={{ display: 'flex', alignItems: 'end', justifyContent: 'space-around' }}>
				<TextField
					label="Tag"
					variant="standard"
					value={tagValue}
					onChange={(e) => setTagValue(e.target.value)}
					error={!tagValue.length}
				/>
				<IconButton disabled={!tagValue.length} onClick={onSave}>
					<Save />
				</IconButton>
			</DialogContent>
		</Dialog>
	);
}
