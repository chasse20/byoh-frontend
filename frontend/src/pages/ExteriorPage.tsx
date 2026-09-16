import { PageWithToolbar } from '../layouts';
import { Sidebar, Viewport } from 'components/index';

export const ExteriorPage = () => {
	return (
		<PageWithToolbar>
			<Viewport title="Exterior" />
			<Sidebar />
		</PageWithToolbar>
	);
};
