import { PageWithHeader } from '../../layouts/PageWithHeader';
import { PrimaryButton } from 'components/index';
import { useByohNavigation } from 'hooks/index';
import { RoutePath } from 'constants/index';

import styles from './WelcomePage.module.css';

export function WelcomePage() {
	const { navigate } = useByohNavigation();

	return (
		<PageWithHeader>
			<div className={styles.container}>
				<h4>
					⚠ BYOH is under construction today. Your build process may take longer
					than expected.
				</h4>
				<h1>Welcome to Build Your Own Home</h1>
				<PrimaryButton
					onClick={() => {
						navigate(
							'interior-design?community=Glenmore+Farm&floorplan=Timberneck+III' as RoutePath
						);
					}}
				>
					<h3>START BUILDING</h3>
				</PrimaryButton>
			</div>
		</PageWithHeader>
	);
}
