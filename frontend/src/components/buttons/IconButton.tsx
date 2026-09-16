import styles from './buttons.module.css';

interface Props {
	onPress: () => void;
	title: string;
	iconSrc?: string;
	isDisabled?: boolean;
}

export function IconButton({ title, onPress, iconSrc }: Props) {
	return (
		<div
			className={styles.iconButton}
			onClick={onPress}
			tabIndex={0}
			role="button"
		>
			<img src={iconSrc} height={36} alt={`${title} icon`}></img>
			<div className={styles.iconTitle}>{title}</div>
		</div>
	);
}
