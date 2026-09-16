import { useEffect, useState } from 'react';

import {
	useStepsStore,
	gotoNextStep,
	gotoPreviousStep,
	setCurrentStepIndex,
	Step,
	getStepIndexByUrl,
} from 'state/index';
import { useByohNavigation } from './useByohNavigation';
import { RoutePath } from 'constants/index';

interface Props {
	willAlignStepsWithUrl?: boolean;
}

export function useSteps({ willAlignStepsWithUrl = true }: Props = {}) {
	const [steps, currentStepIndex] = useStepsStore((state) => [
		state.steps,
		state.currentStepIndex,
	]);
	const {
		navigate,
		navigateAndClearSearchParams,
		searchParamsObject,
		location,
	} = useByohNavigation();

	const completionPercentage = Math.round(
		(currentStepIndex / (steps.length - 1)) * 100
	);

	useEffect(() => {
		if (!willAlignStepsWithUrl) {
			return;
		}

		// console.log(
		// 	'location, searchParamsObject changed, will attemp to align step with URL...',
		// 	{
		// 		location,
		// 		searchParamsObject,
		// 	}
		// );
		// TODO - please note - this works with the hard coded "initialSteps" array
		// TODO - but the steps will need to be generated BEFORE we try and align URL to steps
		// TODO so if this isn't a first page view it would be okay, but if it is we need
		// TODO to generate the steps first

		const stepBestMatchIndex = getStepIndexByUrl(
			location.pathname,
			searchParamsObject
		);

		if (stepBestMatchIndex !== currentStepIndex) {
			setCurrentStepIndex(stepBestMatchIndex);
		}
	}, [searchParamsObject, location]);

	const navigateToBestMatchStep = () => {
		const stepBestMatchIndex = getStepIndexByUrl(
			location.pathname,
			searchParamsObject
		);

		if (stepBestMatchIndex !== currentStepIndex) {
			setCurrentStepIndex(stepBestMatchIndex);
			navigateToStepByIndex(stepBestMatchIndex);
		}
	};

	const gotoNextStepAndNavigate = () => {
		// TODO These checks are in the nextStep/previousStep in the
		// TODO state functions, but we need there here to prevent or
		// TODO trigger a navigation event - so remove from state? Or keep both?
		if (currentStepIndex === steps.length - 1) {
			return;
		}

		gotoNextStep();
		const nextStep = steps[currentStepIndex + 1];

		if (nextStep.associatedOptions) {
			navigate(nextStep.baseUrl as RoutePath, {
				appendSearchParams: nextStep.associatedOptions,
			});
		} else {
			navigateAndClearSearchParams(nextStep.baseUrl as RoutePath);
		}
	};

	const gotoPreviousStepAndNavigate = () => {
		if (currentStepIndex === 0) {
			return;
		}

		gotoPreviousStep();

		const prevStep = steps[currentStepIndex - 1];

		if (prevStep.associatedOptions) {
			navigate(prevStep.baseUrl as RoutePath, {
				appendSearchParams: prevStep.associatedOptions,
			});
		} else {
			navigateAndClearSearchParams(prevStep.baseUrl as RoutePath);
		}
	};

	const navigateToStepByIndex = (index: number) => {
		const selectedStep = steps[index];

		if (!selectedStep) {
			console.warn('cound not find step at index', index);
			return;
		}

		setCurrentStepIndex(index);

		if (selectedStep.associatedOptions) {
			navigate(selectedStep.baseUrl as RoutePath, {
				appendSearchParams: selectedStep.associatedOptions,
			});
		} else {
			navigateAndClearSearchParams(selectedStep.baseUrl as RoutePath);
		}
	};

	return {
		steps,
		currentStepIndex,
		currentStep: steps[currentStepIndex],
		completionPercentage,
		navigateToStepByIndex,
		gotoNextStepAndNavigate,
		gotoPreviousStepAndNavigate,
		navigateToBestMatchStep,
	};
}
