import { useEffect, useMemo } from 'react';

import { useRoomStore, setSelectedRoom, getRoomData } from 'state/index';
import { NavigationStatus } from 'constants/index';
import { useByohNavigation } from 'hooks/index';
import { SelectOption } from 'interfaces/index';
import { RoutePath } from 'constants/index';
import { Select, NavigationTile, IconButton } from './';

interface Props {
	status: NavigationStatus;
}

export function InteriorDesignNavTile({ status }: Props) {
	const { searchParamsObject, navigate } = useByohNavigation();
	const [rooms, selectedRoom] = useRoomStore((state) => [
		state.rooms,
		state.selectedRoom,
	]);

	const handleSelectChange = (option: SelectOption) => {
		const tempSelectedRoom = rooms.find(
			(room: any) => room.id === option.value
		);

		if (!tempSelectedRoom || selectedRoom?.id === tempSelectedRoom.id) return;

		setSelectedRoom(tempSelectedRoom);

		navigate(RoutePath.InteriorDesign, {
			appendSearchParams: {
				room: tempSelectedRoom.id,
				// * Also setting the sidebar option to the first item, as the user has changed rooms
				// * And we want to update the sidebar to reflect the new room options (and have it not be blank)
				option: tempSelectedRoom.options[0].id,
			},
		});
	};

	// * Mostly used for updating the selected room when the user NAVIGATES to the room
	// * (So based on the URL param change)
	const updateCurrentRoomOnDataChange = () => {
		if (!rooms?.length) return;

		const tempSelectedRoom = rooms?.find(
			(room: any) => room.id === searchParamsObject.room
		);

		// If no room is selected, or the selected room is the same as the current selected room, dont do anything
		if (!tempSelectedRoom || tempSelectedRoom.id === selectedRoom?.id) return;

		console.log('setting selected room to: ', tempSelectedRoom);
		setSelectedRoom(tempSelectedRoom);
	};

	const roomOptions: SelectOption[] = useMemo(() => {
		return rooms.map((room: any) => {
			return {
				value: room.id,
				label: room.name,
			};
		});
	}, [rooms, selectedRoom, searchParamsObject.room]);

	const selectedRoomOption: SelectOption | null = useMemo(() => {
		if (!selectedRoom) return null;

		return {
			value: selectedRoom?.id,
			label: selectedRoom?.name,
		};
	}, [selectedRoom]);

	// * Run on mount, to get the initial room data
	// TODO let's run this to get all the app data based on community and floorplan
	// TODO need to make this run on entry to the app
	// useEffect(() => {
	// 	getRoomData();
	// }, []);

	useEffect(() => {
		updateCurrentRoomOnDataChange();
	}, [rooms, selectedRoom, searchParamsObject.room]);

	return (
		<NavigationTile title="Interior Design" status={status}>
			<Select
				options={roomOptions}
				onChange={handleSelectChange}
				value={selectedRoomOption}
			/>
			{selectedRoom?.options?.map((option: any) => {
				return (
					<IconButton
						key={option.id}
						title={option.name}
						onPress={() => {
							navigate(RoutePath.InteriorDesign, {
								appendSearchParams: { option: option.id },
							});
						}}
						iconSrc={option.iconUrl}
					/>
				);
			})}
		</NavigationTile>
	);
}
