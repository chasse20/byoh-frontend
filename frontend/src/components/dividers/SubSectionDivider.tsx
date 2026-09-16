import styles from './dividers.module.css';

interface Props {
	title: string;
	color?: string;
}

export function SubSectionDivider({ title, color }: Props) {
	return (
		<div className={styles.subSection}>
			<h4>{title}</h4>
		</div>
	);
}
