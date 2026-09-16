import { StepController } from '../StepController';
import styles from './SidebarFooter.module.css';

export function SidebarFooter() {
	return (
		<>
			<StepController />
			<footer className={styles.laptopFooter}></footer>
		</>
	);
}
