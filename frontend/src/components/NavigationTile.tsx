import classNames from 'classnames';

import { NavigationStatus } from 'constants/index';
import styles from './NavigationTile.module.css';

interface Props {
	title?: string;
	status?: NavigationStatus;
	children?: React.ReactNode | React.ReactNode[];
}

export function NavigationTile({ title, status, children }: Props) {
	const headerStyle = classNames(styles.titleBg, {
		[styles.active]: status === NavigationStatus.Active,
	});

	return (
		<div className={styles.container}>
			{title && (
				<div className={headerStyle}>
					<h3 className={styles.title}>{title}</h3>
					<div className={styles.statusIndicator}>✔</div>
				</div>
			)}
			<div className={styles.content}>{children}</div>
		</div>
	);
}
