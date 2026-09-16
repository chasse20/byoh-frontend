import { Header } from '../components';

import styles from './layout.module.css';

export const PageWithHeader = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={styles.page}>
			<Header />
			{children}
		</div>
	);
};
