import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SelectedOption = Record<string, string>;

interface SelectedOptionArgs {
	key: string;
	value: string;
}

interface OptionsState {
	selectedOptions: SelectedOption;
	selectedTiers: SelectedOption;
	// setSelectedOption: (selectedOptions: SelectedOptionArgs) => void;
}

// selectiedOptions ends up looking like this:
// {
// 	"backsplash": "level-1-arctic-white",
// 	"countertop": "level-2-marble",
// }

// {
// 	"backsplash-tier": "level-1",
// 	"countertop-tier": "level-2",
// }

export const useOptionsStore = create<OptionsState>()(
	persist(
		(set) => ({
			selectedOptions: {},
			selectedTiers: {},
			// setSelectedOption: ({ key, value }: SelectedOptionArgs) =>
			// 	set((state) => {
			// 		return updateSelectedOptions({ key, value, state });
			// 	}),
		}),
		{ name: 'options-storage', version: 0 }
	)
);

export function setSelectedOption({ key, value }: SelectedOptionArgs) {
	console.log('Setting selected options: ', { key, value });

	useOptionsStore.setState((state) => {
		return updateSelectedOptions({ key, value, state });
	});
}

function updateSelectedOptions({
	key,
	value,
	state,
}: any): Partial<OptionsState> {
	if (state.selectedOptions[key] === value) {
		// Remove the key, as it's toggled off
		delete state.selectedOptions[key];

		return {
			selectedOptions: { ...state.selectedOptions },
			selectedTiers: state.selectedTiers,
		};
	} else {
		return {
			selectedOptions: { ...state.selectedOptions, [key]: value },
			selectedTiers: state.selectedTiers,
		};
	}
}

export function setSelectedTier({ key, value }: SelectedOptionArgs) {
	console.log('Setting selected tier: ', { key, value });

	useOptionsStore.setState((state) => {
		return updateSelectedTier({ key, value, state });
	});
}

function updateSelectedTier({ key, value, state }: any): Partial<OptionsState> {
	if (state.selectedTiers[key] === value) {
		// Remove the key, as it's toggled off
		delete state.selectedTiers[key];

		return {
			selectedOptions: state.selectedOptions,
			selectedTiers: { ...state.selectedTiers },
		};
	} else {
		return {
			selectedOptions: state.selectedOptions,
			selectedTiers: { ...state.selectedTiers, [key]: value },
		};
	}
}
