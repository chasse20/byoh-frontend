import { sleep, getRandomIntInclusive } from 'utils/index';

export async function getFloorPlanById(id?: number): Promise<any> {
	await sleep(getRandomIntInclusive(100, 350));

	console.log('Getting api data for floor plan by ID: ', id);

	return mockFloorPlanData;
}

export async function getFloorPlanBySlug(slug?: string): Promise<any> {
	await sleep(getRandomIntInclusive(100, 350));

	console.log('Getting api data for floor plan by ID: ', slug);

	return mockFloorPlanData;
}

const mockFloorPlanData = {
	id: 6,
	name: 'Timberneck III',
	cameras: [
		{ id: 1, name: 'Camera 1', tag: 'kitchen' },
		{ id: 2, name: 'Camera 2', tag: 'master-bath' },
		{ id: 3, name: 'Camera 3', tag: 'master-bed' },
	],
};
