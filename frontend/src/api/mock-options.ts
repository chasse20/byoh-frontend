import { sleep, getRandomIntInclusive } from 'utils/index';

import cabinetData from '../data/cabinet-data.json';
import flooringData from '../data/flooring-data.json';
import colorData from '../data/wall-color-data.json';
import counterTopData from '../data/counter-top-data.json';
import backsplashData from '../data/backsplash-data.json';

export async function getOptionData(
	optionId?: string,
	community?: string,
	floorplan?: string
) {
	const apiLatency = getRandomIntInclusive(50, 500);
	await sleep(apiLatency);

	switch (optionId) {
		case 'cabinets':
			return cabinetData;
		case 'flooring':
			return flooringData;
		case 'wall-color':
			return colorData;
		case 'counter':
			return counterTopData;
		case 'backsplash':
			return backsplashData;
		case 'tile':
			return backsplashData;
		default:
			return cabinetData;
	}
}
