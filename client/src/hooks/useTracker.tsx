import { useState } from 'react';
import { createEntry } from '../routes/routes';
import useTagInput from '../hooks/useTagInput';
import { TimeEntryModel } from '../common/TimeEntryModel';

export function useTracker(setRefresh: React.Dispatch<React.SetStateAction<boolean>>) {
	const [duration, setDuration] = useState(0);
	const [isTrackerRunning, setIsTrackerRunning] = useState(false);
	const [timerId, setTimerId] = useState(0);
	const [tag, setTag] = useTagInput('');

	let TimeTracked: TimeEntryModel = {
		duration,
		tag,
	};

	function toggleTimeTracker() {
		if (isTrackerRunning) {
			TimeTracked = {
				...TimeTracked,
				duration: duration,
				tag: tag,
			};
			setDuration(0);
			setTimerId(0);
			setIsTrackerRunning(false);
			setTag('');
			clearInterval(timerId);

			createEntry(TimeTracked);

			setRefresh((prev) => !prev);
		} else {
			const startTimestamp = Date.now() - duration;
			const id = setInterval(() => {
				const currentDuration = Date.now() - startTimestamp;
				setDuration(currentDuration);
			}, 1000);

			setTimerId(id);
			setIsTrackerRunning(true);
		}
	}

	return {
		duration,
		isTrackerRunning,
		tag,
		setTag,
		toggleTimeTracker,
	};
}
