import { VmHeader } from './VmHeader';
import { NavHeader } from './NavHeader';

import styles from './NavHeader.module.css';

export const Header = () => {
	return (
		<header className={styles.header}>
			<VmHeader />
			<NavHeader />
		</header>
	);
};
