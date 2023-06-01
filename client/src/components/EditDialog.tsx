import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { TextField } from '@mui/material';
import useTagInput from '../hooks/useTagInput';

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
}

export default function DraggableDialog({ open, handleClose, id, tag }: DraggableDialogProps) {
	const [tagValue, setTagValue] = useTagInput(tag);
	return (
		<div>
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
				<DialogContent>
					<TextField
						label="Tag"
						variant="standard"
						value={tagValue}
						onChange={(e) => setTagValue(e.target.value)}
						error={!tagValue.length}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						autoFocus
						onClick={() => {
							handleClose();
							setTagValue(tag);
						}}
					>
						Cancel
					</Button>
					<Button disabled={!tagValue.length} onClick={handleClose}>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
