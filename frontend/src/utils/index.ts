export { formatNumber } from './number-formatters';
export {
	isOlderThanInMs,
	isYoungerThanInMs,
	TWO_MINUTES,
	FIVE_MINUTES,
} from './time';

export function sleep(millisecondsToSleep: number) {
	return new Promise((resolve) => setTimeout(resolve, millisecondsToSleep));
}

export function getRandomIntInclusive(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
