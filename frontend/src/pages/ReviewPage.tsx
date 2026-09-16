import { PageWithToolbar } from '../layouts';
import { Sidebar, Viewport } from 'components/index';

export const ReviewPage = () => {
	return (
		<PageWithToolbar>
			<Viewport title="Review" />
			<Sidebar />
		</PageWithToolbar>
	);
};
