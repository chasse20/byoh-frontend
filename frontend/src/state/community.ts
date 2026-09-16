import { create } from 'zustand';

import { isYoungerThanInMs, TWO_MINUTES } from 'utils/index';
import { Community, FloorPlan } from 'interfaces/index';
import {
	getCommunityDataById,
	getFloorPlanById,
	getCommunityDataBySlug,
	getFloorPlanBySlug,
} from 'api/index';

interface CommunityDataState {
	isLoading: boolean;
	lastUpdated: number;
	selectedCommunity?: Community | null;
	selectedFloorPlan?: FloorPlan | null;
}

export const useCommunityStore = create<CommunityDataState>()((set) => ({
	isLoading: false,
	lastUpdated: 0,
	selectedCommunity: undefined,
	selectedFloorPlan: undefined,
}));

export async function setSelectedCommunityById(communityId: number) {
	const { selectedCommunity } = useCommunityStore.getState();

	if (selectedCommunity && selectedCommunity.id === communityId) {
		console.log('Community already selected, aborting...');
		return;
	}

	setCommunityState({ isLoading: true });

	const tempCommunity = await getCommunityDataById(communityId);

	useCommunityStore.setState((state) => {
		return { ...state, selectedCommunity: tempCommunity };
	});
}

export async function setSelectedCommunityBySlug(communitySlug: string) {
	const { selectedCommunity } = useCommunityStore.getState();

	if (selectedCommunity && selectedCommunity.slug === communitySlug) {
		console.log('Community already selected, aborting...');
		return;
	}

	setCommunityState({ isLoading: true });

	const tempCommunity = await getCommunityDataBySlug(communitySlug);

	console.log({ tempCommunity });

	useCommunityStore.setState((state) => {
		return { ...state, selectedCommunity: tempCommunity, isLoading: false };
	});
}

export async function setSelectedFloorPlanById(floorPlanId: number) {
	const { selectedFloorPlan } = useCommunityStore.getState();

	if (selectedFloorPlan && selectedFloorPlan.id === floorPlanId) {
		console.log('Floorplan already selected, aborting...');
		return;
	}

	setCommunityState({ isLoading: true });

	const tempFloorPlan = await getFloorPlanById(floorPlanId);

	useCommunityStore.setState((state) => {
		return { ...state, selectedFloorPlan: tempFloorPlan, isLoading: false };
	});
}

export async function setSelectedFloorPlanBySlug(floorPlanSlug: string) {
	const formattedSlug = floorPlanSlug.toLocaleLowerCase();

	const { selectedFloorPlan } = useCommunityStore.getState();

	if (selectedFloorPlan && selectedFloorPlan.slug === formattedSlug) {
		console.log('Floorplan already selected, aborting...');
		return;
	}

	setCommunityState({ isLoading: true });

	const tempFloorPlan = await getFloorPlanBySlug(formattedSlug);

	useCommunityStore.setState((state) => {
		return { ...state, selectedFloorPlan: tempFloorPlan, isLoading: false };
	});
}

// * Generic update function, can pass anything in
export function setCommunityState(data: any) {
	useCommunityStore.setState((state) => {
		return { ...state, ...data };
	});
}

export async function getCommunityData() {
	const { lastUpdated } = useCommunityStore.getState();

	if (isYoungerThanInMs(lastUpdated, TWO_MINUTES)) {
		console.log('Getting community data aborted as its fresh...');
		// * Cancel fetch if data is less than 2 minutes old
		return;
	}

	console.log('Getting community data...');

	setCommunityState({ isLoading: true });

	// const rooms = await getRoomDataApi();
	setCommunityState({ isLoading: false, lastUpdated: Date.now() });
}

// * You'll know what FPs are available and an array of cameras will be sent to the frontend.
// * The camera data contains the room tag.
// * So we get the room data based on tag that is associated with the floorplans
