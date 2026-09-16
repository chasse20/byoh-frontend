import { useMemo } from 'react';
import {
	useNavigate,
	useLocation,
	useSearchParams,
	createSearchParams,
} from 'react-router-dom';

import { RoutePath } from 'constants/index';

export interface ByohNavigationOptions {
	appendSearchParams?: Record<string, string>;
}

export function useByohNavigation() {
	const [searchParams, setSearchParams] = useSearchParams();
	const routerNavigate = useNavigate();
	const location = useLocation();

	const searchParamsObject = useMemo(
		() => Object.fromEntries(new URLSearchParams(searchParams)),
		[searchParams]
	);

	const navigateAndClearSearchParams = (routePath: RoutePath) => {
		routerNavigate(routePath);
	};

	const navigateAndReplaceSearchParams = (
		routePath: RoutePath,
		searchParams: {}
	) => {
		const finalRoute = `${routePath}?${createSearchParams(searchParams)}`;
		routerNavigate(finalRoute);
	};

	const navigate = (
		route: RoutePath,
		{ appendSearchParams }: ByohNavigationOptions = {},
		shouldPersistQueryParams = true
	) => {
		let finalRoute = route as string;

		// TODO fix this, its pretty weird - my brain is tired right now
		// TODO feels hacky, but it works for now
		if (searchParams && shouldPersistQueryParams) {
			finalRoute = `${route}?${createSearchParams(searchParams)}`;
		}

		if (appendSearchParams) {
			appendToSearchParams(appendSearchParams);
			finalRoute = `${route}?${createSearchParams(searchParams)}`;
		}
		// TODO end fix ==

		console.log('Navigating to: ', finalRoute);

		routerNavigate(finalRoute);
	};

	const isCurrentRoute = (route: RoutePath) => {
		if (route === location.pathname) {
			return true;
		}
	};

	const appendToSearchParams = (params: Record<string, string>) => {
		for (const [key, value] of Object.entries(params)) {
			searchParams.set(key, value);
		}

		setSearchParams(searchParams);
	};

	return {
		appendToSearchParams,
		navigate,
		navigateAndClearSearchParams,
		navigateAndReplaceSearchParams,
		searchParams,
		setSearchParams,
		searchParamsObject,
		isCurrentRoute,
		location,
	};
}
