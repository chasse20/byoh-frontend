import classNames from 'classnames';

import styles from './TierOption.module.css';

export function TierOption({ option, onClick, isSelected }: any) {
	return (
		<div
			className={classNames(styles.container, {
				[styles.selected]: isSelected,
			})}
			onClick={onClick}
		>
			<h4>{option.title}</h4>
		</div>
	);
}
