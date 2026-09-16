import { useEffect } from 'react';

import { PageWithHeader } from '../../layouts';
import { Toolbar, Sidebar, StreamViewport } from 'components/index';
import { useByohNavigation, useSteps } from 'hooks/index';
import { getRoomData } from 'state/index';

import byohBackground from 'assets/byoh-background.png';
import styles from './InteriorDesignPage.module.css';

export const InteriorDesignPage = () => {
	const { currentStepIndex, navigateToBestMatchStep } = useSteps({
		// * We want to manually control this at this point
		willAlignStepsWithUrl: false,
	});

	const { searchParamsObject } = useByohNavigation();

	// * On mount, if there is no option in the search params, navigate to the first option via step best guess
	useEffect(() => {
		if (searchParamsObject?.option) return;

		navigateToBestMatchStep();
	}, [currentStepIndex]);

	useEffect(() => {
		getRoomData();
	}, []);

	return (
		<PageWithHeader>
			<div className={styles.content}>
				<Toolbar />
				<main>
					<StreamViewport imgSrc={byohBackground} />
					<Sidebar />
				</main>
			</div>
		</PageWithHeader>
	);
};
