import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getRoomData as getRoomDataApi } from 'api/index';
import { isYoungerThanInMs, TWO_MINUTES } from 'utils/index';

interface RoomState {
	isLoading: boolean;
	lastUpdated: number;
	rooms: any[];
	selectedRoom: any;
}

export const useRoomStore = create<RoomState>()(
	persist(
		(set) => ({
			isLoading: false,
			selectedRoom: undefined,
			rooms: [],
			lastUpdated: 0,
		}),
		{ name: 'room-storage', version: 0 }
	)
);

export function setSelectedRoom(room: any) {
	useRoomStore.setState((state) => {
		return { ...state, selectedRoom: room };
	});
}

export function setRoomData(rooms: any) {
	useRoomStore.setState((state) => {
		return { ...state, rooms };
	});
}

export function setRoomState(data: any) {
	useRoomStore.setState((state) => {
		return { ...state, ...data };
	});
}

export async function getRoomData() {
	const { lastUpdated } = useRoomStore.getState();

	if (isYoungerThanInMs(lastUpdated, TWO_MINUTES)) {
		// console.log('Getting room data aborted as its fresh...');
		// * Cancel fetch if data is less than 2 minutes old
		return;
	}

	// console.log('Getting room data...');

	setRoomState({ isLoading: true });

	const rooms = await getRoomDataApi();
	setRoomState({ isLoading: false, rooms, lastUpdated: Date.now() });
}
