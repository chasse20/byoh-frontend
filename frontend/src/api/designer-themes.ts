import { sleep, getRandomIntInclusive } from 'utils/index';

import designerThemeData from '../data/designer-themes.json';

export async function getDesignerThemeData(
	community?: string,
	floorplan?: string
) {
	const apiLatency = getRandomIntInclusive(250, 2000);
	await sleep(apiLatency);

	return designerThemeData;
}
