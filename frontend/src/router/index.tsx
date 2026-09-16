import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { RoutePath } from 'constants/index';
import {
	ExteriorPage,
	ReviewPage,
	LotPage,
	PlanPage,
	WelcomePage,
	InteriorDesignPage,
} from '../pages';

// * For some reason HMR isn't working with the roll up above
// import { InteriorDesignPage } from '../pages/interior-design/InteriorDesignPage';

const homeRoute = { path: '/', element: <WelcomePage /> };
const aboutRoute = { path: '/about', element: <div>About</div> };
const interiorDesignRoute = {
	path: RoutePath.InteriorDesign,
	element: <InteriorDesignPage />,
};
const exteriorRoute = { path: RoutePath.Exterior, element: <ExteriorPage /> };
const lotRoute = { path: RoutePath.Lot, element: <LotPage /> };
const reviewRoute = { path: RoutePath.Review, element: <ReviewPage /> };
const planRoute = { path: RoutePath.Plan, element: <PlanPage /> };

const routes: RouteObject[] = [
	homeRoute,
	aboutRoute,
	interiorDesignRoute,
	exteriorRoute,
	lotRoute,
	reviewRoute,
	lotRoute,
	reviewRoute,
	planRoute,
];

export const router = createBrowserRouter(routes);

// ?community=Glenmore+Farm&floorplan=Belmont+II&streaming=1&room=Kitchen&camera=1

// Could be something to look into
// https://www.robinwieruch.de/react-router-search-params/
