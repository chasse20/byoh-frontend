import { sleep, getRandomIntInclusive } from 'utils/index';
import roomData from '../data/room-data.json';

export async function getRoomData(community?: string, floorplan?: string) {
	const apiLatency = getRandomIntInclusive(250, 2000);
	await sleep(apiLatency);

	return roomData;
}

export async function getRoomByTagId(tagId: string | number) {
	const apiLatency = getRandomIntInclusive(50, 350);
	await sleep(apiLatency);

	const tempRoomData = roomData.find((room) => room.id === tagId);

	return tempRoomData;
}
