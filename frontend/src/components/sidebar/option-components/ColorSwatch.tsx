import classNames from 'classnames';

import styles from './ColorSwatch.module.css';

interface Props {
	option: any;
	onClick: () => void;
	isSelected?: boolean;
}

export function ColorSwatch({ option, onClick, isSelected }: Props) {
	return (
		<div className={styles.container} onClick={onClick}>
			<div
				className={classNames(styles.swatch, { [styles.selected]: isSelected })}
				style={{
					backgroundColor: option.color,
				}}
			></div>
			<h4>{option.title}</h4>
		</div>
	);
}
