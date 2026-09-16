import { ModalHeader } from './ModalHeader';

import styles from './modal.module.css';

interface Props {
	title: string;
	children: React.ReactNode | React.ReactNode[];
}

export function ModalBase({ children, title }: Props) {
	return (
		<div className={styles.container}>
			<ModalHeader title={title} />
			<div className={styles.content}>{children}</div>
		</div>
	);
}
