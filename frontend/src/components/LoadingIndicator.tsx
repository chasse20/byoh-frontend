import styles from './LoadingIndicator.module.css';

interface Props {
	isLoading: boolean;
}

export function LoadingIndicator({ isLoading }: Props) {
	return isLoading ? <div className={styles.container}>Loading...</div> : null;
}
