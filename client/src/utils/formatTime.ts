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
