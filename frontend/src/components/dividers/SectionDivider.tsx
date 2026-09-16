import styles from './dividers.module.css';

interface Props {
	title: string;
	color?: string;
}

export function SectionDivider({ title, color }: Props) {
	return (
		<div className={styles.section}>
			<h3>{title}</h3>
		</div>
	);
}
