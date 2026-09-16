import { Header, Toolbar } from '../components';

import styles from './layout.module.css';

export const PageWithToolbar = ({
	children,
}: {
	children: React.ReactNode | React.ReactNode[];
}) => {
	return (
		<div className={styles.page}>
			<Header />
			<div className={styles.content}>
				<Toolbar />
				<main>{children}</main>
			</div>
		</div>
	);
};
