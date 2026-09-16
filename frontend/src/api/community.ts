import { sleep, getRandomIntInclusive } from 'utils/index';

export async function getCommunityDataById(id?: number): Promise<any> {
	await sleep(getRandomIntInclusive(100, 350));

	console.log('Getting api data for community: ', id);

	return mockCommunityData;
}

export async function getCommunityDataBySlug(slug?: string): Promise<any> {
	await sleep(getRandomIntInclusive(100, 350));

	console.log('Getting api data for community: ', slug);

	return mockCommunityData;
}

const mockCommunityData = {
	id: 1,
	name: 'Glenmore Farm',
	floorPlans: [
		{
			id: 1,
			name: 'The Aspen',
			slug: 'the-aspen',
		},
		{
			id: 2,
			name: 'The Birch',
			slug: 'the-birch',
		},
		{
			id: 3,
			name: 'The Cedar',
			slug: 'the-cedar',
		},
		{
			id: 4,
			name: 'Timberneck I',
			slug: 'timberneck-i',
		},
		{
			id: 5,
			name: 'Timberneck II',
			slug: 'timberneck-ii',
		},
		{
			id: 6,
			name: 'Timberneck III',
			slug: 'timberneck-iii',
		},
	],
};
