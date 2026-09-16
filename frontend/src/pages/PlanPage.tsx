import { PageWithToolbar } from '../layouts';
import { Viewport, StepController } from 'components/index';

export const PlanPage = () => {
	return (
		<PageWithToolbar>
			<div className="column flex">
				<Viewport title="Plan" />
				<StepController />
			</div>
		</PageWithToolbar>
	);
};
