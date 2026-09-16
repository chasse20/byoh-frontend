import { formatNumber } from 'utils/index';

import styles from './PricingDisplay.module.css';

interface Props {
	base: number;
	selections: number;
}

export function PricingDisplay({ base, selections }: Props) {
	return (
		<div className={styles.container}>
			<div className="row justify-between">
				<h3 className={styles.pricingTitle}>Base Price:</h3>
				<div>${formatNumber(base)}</div>
			</div>
			<div className="row justify-between">
				<h3 className={styles.pricingTitle}>Selections:</h3>
				<div>${formatNumber(selections)}</div>
			</div>
			<div>
				<hr />
			</div>
			<div className="row justify-between">
				<h3 className={styles.totalTitle}>Est. Total:</h3>
				<div>${formatNumber(base + selections)}</div>
			</div>
		</div>
	);
}
