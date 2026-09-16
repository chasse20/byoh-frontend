import { useSteps } from 'hooks/index';
import { PrimaryButton } from './buttons/PrimaryButton';

import styles from './StepController.module.css';

export function StepController() {
	const {
		gotoNextStepAndNavigate,
		gotoPreviousStepAndNavigate,
		completionPercentage,
	} = useSteps();

	return (
		<footer className={styles.mobileFooter}>
			<div className={styles.progressBarContainer}>
				<div
					className={styles.progressBar}
					style={{ width: `${completionPercentage}%` }}
				/>
			</div>
			<div className={styles.container}>
				<button
					tabIndex={0}
					className={styles.previousStepButton}
					onClick={gotoPreviousStepAndNavigate}
				>
					&lt; Previous Step
				</button>
				<PrimaryButton onClick={gotoNextStepAndNavigate}>NEXT</PrimaryButton>
			</div>
		</footer>
	);
}
