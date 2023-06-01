export function formatTime(time: number) {
	const hours = Math.floor(time / 3600000)
		.toString()
		.padStart(2, '0');
	const minutes = Math.floor((time / 60000) % 60)
		.toString()
		.padStart(2, '0');
	const seconds = Math.floor((time / 1000) % 60)
		.toString()
		.padStart(2, '0');
	return `${hours}:${minutes}:${seconds}`;
}

export function formatTimestamp(timestamp: number): string {
	const hours = Math.floor(timestamp / 3600000);
	const minutes = Math.floor((timestamp / 60000) % 60);
	const seconds = Math.floor((timestamp / 1000) % 60);
	return `${hours}h ${minutes}m ${seconds}s`;
}

export const convertToTimestamp = (duration: string): number => {
	const [hoursStr, minutesStr, secondsStr] = duration.split(' ');

	const hours = parseInt(hoursStr.replace('h', ''), 10) || 0;
	const minutes = parseInt(minutesStr.replace('m', ''), 10) || 0;
	const seconds = parseInt(secondsStr.replace('s', ''), 10) || 0;

	const milliseconds = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;

	return milliseconds;
};
