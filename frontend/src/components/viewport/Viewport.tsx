import classNames from 'classnames';
import styles from './Viewport.module.css';

interface Props {
	title?: string;
	imgSrc?: string;
}

export function Viewport({ title, imgSrc }: Props) {
	const isBordered = imgSrc ? false : true;
	return (
		<div
			className={classNames(styles.viewport, {
				[styles.border]: isBordered,
			})}
		>
			{imgSrc ? (
				<img src={imgSrc} className={styles.image} />
			) : (
				<h2 className={styles.viewportTitle}>{title || 'Viewport'}</h2>
			)}
		</div>
	);
}
