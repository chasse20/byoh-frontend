import { RoutePath } from 'constants/index';
import {
	NavigationTile,
	PricingDisplay,
	IconButton,
	Select,
	InteriorDesignNavTile,
} from 'components/index';
import { NavigationStatus } from 'constants/index';
import { useByohNavigation } from 'hooks/index';

import houseIcon from 'assets/icons/house-icon-sm.svg';
import lotIcon from 'assets/icons/lot-icon-sm.svg';
import painterRollerIcon from 'assets/icons/paint-roller-icon-sm.svg';
import reviewIcon from 'assets/icons/review-icon-sm.svg';
import landscapingIcon from 'assets/icons/landscaping-icon-sm.svg';

import styles from './Toolbar.module.css';

export function Toolbar() {
	const {
		navigate,
		navigateAndClearSearchParams,
		navigateAndReplaceSearchParams,
		isCurrentRoute,
	} = useByohNavigation();

	const getRouteStatus = (route: RoutePath): NavigationStatus => {
		return isCurrentRoute(route)
			? NavigationStatus.Active
			: NavigationStatus.NotStarted;
	};

	return (
		<div className={styles.content}>
			<NavigationTile title="Lot" status={getRouteStatus(RoutePath.Lot)}>
				<IconButton
					title="Lot"
					onPress={() => {
						navigate(RoutePath.Lot);
					}}
					iconSrc={lotIcon}
				/>
			</NavigationTile>
			<NavigationTile
				title="Exterior"
				status={getRouteStatus(RoutePath.Exterior)}
			>
				<IconButton
					title="Elevation"
					onPress={() => {
						navigate(RoutePath.Exterior, {
							appendSearchParams: { option: 'elevation' },
						});
					}}
					iconSrc={houseIcon}
				/>
				<IconButton
					title="Landscaping"
					onPress={() => {
						navigate(RoutePath.Exterior, {
							appendSearchParams: { option: 'landscaping' },
						});
					}}
					iconSrc={landscapingIcon}
				/>
				<IconButton
					title="Color"
					onPress={() => {
						navigate(RoutePath.Exterior, {
							appendSearchParams: { option: 'exterior-color' },
						});
					}}
					iconSrc={painterRollerIcon}
				/>
			</NavigationTile>
			<NavigationTile title="Plan" status={getRouteStatus(RoutePath.Plan)}>
				<IconButton
					title="Plan"
					onPress={() => {
						navigateAndClearSearchParams(RoutePath.Plan);
					}}
					iconSrc={lotIcon}
				/>
			</NavigationTile>
			<InteriorDesignNavTile
				status={getRouteStatus(RoutePath.InteriorDesign)}
			/>
			<NavigationTile title="Review" status={getRouteStatus(RoutePath.Review)}>
				<IconButton
					title="Review"
					onPress={() => {
						navigateAndReplaceSearchParams(RoutePath.Review, {
							phase: 'review',
						});
					}}
					iconSrc={reviewIcon}
				/>
			</NavigationTile>
			<NavigationTile>
				<PricingDisplay base={1150000} selections={35000} />
			</NavigationTile>
		</div>
	);
}
