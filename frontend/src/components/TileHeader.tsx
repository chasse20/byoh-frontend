import classNames from 'classnames';
import { colors } from 'styles/index';

import styles from './TileHeader.module.css';

interface Props {
	title: string;
	color?: string;
	className?: string;
}

export const TileHeader = ({
	title,
	color = colors.vmDarkBlue,
	className = '',
}: Props) => {
	return (
		<div className={classNames(styles.tileHeader, className)}>
			<h2>{title}</h2>
		</div>
	);
};
