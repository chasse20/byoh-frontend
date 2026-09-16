import styles from './VmHeader.module.css';

import vmLogo from 'assets/van-metre-logo-sm.svg';
import iconShield from 'assets/icon-shield.svg';
import iconCalendar from 'assets/icon-calendar.svg';

const IMAGE_HEIGHT = 24;

export const VmHeader = () => (
	<div className={styles.vmHeaderBar}>
		<div style={{ width: 96 }} />
		<div className={styles.vmLogo}>
			<img src={vmLogo} height={IMAGE_HEIGHT} />
		</div>
		<div className={styles.vmRightCorner}>
			<img
				className={styles.icon}
				src={iconShield}
				alt="Public Safety Icon (Shield with Checkmark)"
				height={IMAGE_HEIGHT}
			/>
			<img
				className={styles.icon}
				src={iconCalendar}
				alt="Schedule a Tour Icon (Calendar)"
				height={IMAGE_HEIGHT}
			/>
		</div>
	</div>
);
