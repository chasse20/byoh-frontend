import classNames from 'classnames';

import styles from './DesignerThemeTile.module.css';

interface Props {
	theme: any;
	onClick: () => void;
	isSelected?: boolean;
}

export function DesignerThemeTile({ theme, isSelected, onClick }: Props) {
	return (
		<div className={styles.container} onClick={onClick}>
			<img
				className={classNames(styles.image, { [styles.selected]: isSelected })}
				src={theme.imageUrl}
			></img>
			<h4>{theme.title}</h4>
		</div>
	);
}
