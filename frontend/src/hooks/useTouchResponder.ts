import { useState } from 'react';

// * The required distance between touchStart and touchEnd to be detected as a swipe
const MIN_SWIPE_DIFFERENCE = 50;

interface Props {
	onSwipeDown?: () => void;
	onSwipeUp?: () => void;
}

interface TouchCoordinates {
	x: number;
	y: number;
}

// * Right now it's only responding to vertical swipes
export function useTouchResponder({ onSwipeDown, onSwipeUp }: Props = {}) {
	const [touchStart, setTouchStart] = useState<TouchCoordinates | null>(null);
	const [touchEnd, setTouchEnd] = useState<TouchCoordinates | null>(null);

	const onTouchStart = (event: any) => {
		event.stopPropagation();
		setTouchEnd(null);
		setTouchStart({
			x: event.targetTouches[0].clientX,
			y: event.targetTouches[0].clientY,
		});
	};

	const onTouchMove = (event: any) => {
		event.stopPropagation();
		setTouchEnd({
			x: event.targetTouches[0].clientX,
			y: event.targetTouches[0].clientY,
		});
	};

	const onTouchEnd = (event: any) => {
		event.stopPropagation();
		if (!touchStart || !touchEnd) return;

		const distance = touchStart.y - touchEnd.y;
		const isUpSwipe = distance > MIN_SWIPE_DIFFERENCE;
		const isDownSwipe = distance < -MIN_SWIPE_DIFFERENCE;

		if (isUpSwipe || isDownSwipe) {
			if (isUpSwipe) {
				console.log('swipe up');
				onSwipeUp?.();
			} else {
				console.log('swipe down');
				onSwipeDown?.();
			}
		}
	};

	return { onTouchStart, onTouchMove, onTouchEnd };
}
