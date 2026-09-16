import { useEffect } from 'react';

import {
	useCommunityStore,
	useRoomStore,
	useStepsStore,
	setSelectedFloorPlanBySlug,
	setSelectedCommunityBySlug,
} from 'state/index';
import { useByohNavigation } from 'hooks/index';

// * Roll up of the critical application data that we need to do anything meaningful
export function useApplicationData() {
	const { searchParamsObject } = useByohNavigation();

	const [
		isCommunityLoading,
		currentSelectedCommunity,
		currentSelectedFloorPlan,
	] = useCommunityStore((state) => [
		state.isLoading,
		state.selectedCommunity,
		state.selectedFloorPlan,
	]);

	const isRoomsLoading = useRoomStore((state) => state.isLoading);
	const isStepsLoading = useStepsStore((state) => state.isLoading);

	const isLoading = isCommunityLoading || isRoomsLoading || isStepsLoading;

	useEffect(() => {
		if (searchParamsObject?.community) {
			console.log('running community slug check');
			const paramCommunitySlug = searchParamsObject.community;
			console.log('community slug in URL: ', paramCommunitySlug);

			if (
				!currentSelectedCommunity ||
				currentSelectedCommunity?.slug !== paramCommunitySlug
			) {
				console.log('setting selected community by slug: ', paramCommunitySlug);
				setSelectedCommunityBySlug(paramCommunitySlug);
			}
		} else {
			console.log('no community slug in URL', searchParamsObject?.community);
		}

		if (searchParamsObject?.floorplan) {
			const paramFloorPlanSlug = searchParamsObject.floorplan;

			if (
				!currentSelectedFloorPlan ||
				currentSelectedFloorPlan?.slug !== paramFloorPlanSlug
			) {
				setSelectedFloorPlanBySlug(paramFloorPlanSlug);
			}
		}
	}, [searchParamsObject?.community, searchParamsObject?.floorplan]);

	console.log('useApplicationData: ', {
		currentSelectedCommunity,
		currentSelectedFloorPlan,
	});

	return { isLoading };
}
