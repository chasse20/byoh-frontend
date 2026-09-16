export const FIVE_MINUTES = 5 * 60 * 1000;
export const TWO_MINUTES = 2 * 60 * 1000;

export function isOlderThanInMs(lastUpdated: number, ms: number) {
	return Date.now() - lastUpdated > ms;
}

export function isYoungerThanInMs(lastUpdated: number, ms: number) {
	return Date.now() - lastUpdated < ms;
}
