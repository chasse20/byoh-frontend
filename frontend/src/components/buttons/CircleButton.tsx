import styles from './buttons.module.css';

interface Props {
	onClick: () => void;
	children?: React.ReactNode | React.ReactNode[];
}

export const CircleButton = ({ onClick, children }: Props) => {
	return (
		<button onClick={onClick} className={styles.circleButton}>
			{children}
		</button>
	);
};
