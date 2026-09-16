import classNames from 'classnames';

import styles from './FlooringColorOption.module.css';

interface Props {
	option: any;
	onClick: () => void;
	isSelected?: boolean;
}

export function FlooringColorOption({ option, onClick, isSelected }: Props) {
	return (
		<div className={styles.container} onClick={onClick}>
			<img
				className={classNames(styles.image, { [styles.selected]: isSelected })}
				src={option.imageUrl}
			></img>
			<h4>{option.title}</h4>
		</div>
	);
}
