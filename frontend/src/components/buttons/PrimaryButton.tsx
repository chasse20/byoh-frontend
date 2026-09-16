import classnames from 'classnames';

import styles from './buttons.module.css';

interface Props {
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	style?: React.CSSProperties;
	className?: string;
	children?: React.ReactNode | React.ReactNode[];
}

export function PrimaryButton({ children, onClick, className, style }: Props) {
	return (
		<button
			style={style}
			className={classnames(styles.primaryButton, className)}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
