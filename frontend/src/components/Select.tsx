import Select from 'react-select';

import { colors } from 'styles/index';

interface Props {
	onChange: any;
	options: { value: string; label: string }[];
	value?: any;
}

export function ByohSelect({ options, value, onChange }: Props) {
	return (
		<Select
			value={value}
			onChange={onChange}
			isSearchable={false}
			styles={{
				container: (baseStyles, state) => ({
					...baseStyles,
					// color: 'white',
					width: 164,
					marginRight: 12,
					borderRadius: 12,
				}),
				menuList: (baseStyles, state) => {
					// console.log(baseStyles);
					return {
						...baseStyles,
						padding: 0,
						// transform: 'translateY(100px)',
					};
				},
				menu: (baseStyles, state) => {
					// console.log('menu base', baseStyles);
					const { borderRadius, ...restStyles } = baseStyles;
					return {
						...restStyles,
						//  transform: 'translateY(100px)',
						marginTop: 0,
						// borderRadius: 12,
						borderRadiusTopLeft: 0,
						borderRadiusTopRight: 0,
						// This isn't working
						borderRadiusBottomLeft: 12,
						borderRadiusBottomRight: 12,
					};
				},
				option: (baseStyles, state) => {
					let backgroundColor = state.isSelected
						? colors.primary
						: 'transparent';

					backgroundColor = state.isFocused
						? colors.primaryTint
						: backgroundColor;

					return {
						...baseStyles,
						backgroundColor,
					};
				},
				indicatorSeparator: (baseStyles, state) => ({
					visibility: 'hidden',
				}),
				dropdownIndicator: (baseStyles, state) => ({
					...baseStyles,
					color: colors.lightBodyTextColor,
				}),
				singleValue: (baseStyles, state) => ({
					...baseStyles,
					color: colors.lightBodyTextColor,
				}),
				control: (baseStyles, state) => ({
					...baseStyles,
					backgroundColor: colors.darkGrayColor,
					color: colors.lightBodyTextColor,
					borderRadius: 12,
					padding: 2,
				}),
				valueContainer: (baseStyles, state) => ({
					...baseStyles,
					color: colors.lightBodyTextColor,
				}),
				placeholder: (baseStyles, state) => ({
					...baseStyles,
					color: colors.lightBodyTextColor,
				}),
			}}
			options={options}
			placeholder="ROOM"
		></Select>
	);
}
