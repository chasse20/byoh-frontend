import { TileHeader } from '../TileHeader';
import { useTouchResponder } from 'hooks/index';
import styles from './SidebarHeader.module.css';

interface Props {
	title: string;
	currentRoom: string;
	currentStepName: string;
	onSwipeUp?: () => void;
	onSwipeDown?: () => void;
}

export function SidebarHeader({
	title,
	currentRoom,
	currentStepName,
	onSwipeUp,
	onSwipeDown,
}: Props) {
	const { onTouchStart, onTouchMove, onTouchEnd } = useTouchResponder({
		onSwipeDown,
		onSwipeUp,
	});

	return (
		<>
			<TileHeader title={title} className={styles.laptopHeader} />
			<div
				className={styles.mobileHeader}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
			>
				<TileHeader title={currentStepName} />

				{/* TODO Determine if we want to just axe this feature - it takes up vertical space */}
				{/* TODO which is at premium on mobile devices, especially since we're adding the "NEXT" footer */}
				{/* <div className={styles.optionSelectorContainer}>
					<button className={styles.optionCycleButton}>&lt;</button>
					<h3>option selector</h3>
					<button className={styles.optionCycleButton}>&gt;</button>
				</div> */}
			</div>
		</>
	);
}
