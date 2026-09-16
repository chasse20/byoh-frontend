import { PageWithToolbar } from '../layouts';
import { Viewport, StepController } from 'components/index';

export const LotPage = () => {
	return (
		<PageWithToolbar>
			<div className="column flex">
				<Viewport title="Lot" />
				<StepController />
			</div>
		</PageWithToolbar>
	);
};
