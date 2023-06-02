export function matchTimePattern(input: string): boolean {
	const pattern = /^([0-9]|[1-5][0-9]|24)h ([0-9]|[1-5][0-9]|59)m ([0-9]|[1-5][0-9]|59)s$/;
	return pattern.test(input);
}
