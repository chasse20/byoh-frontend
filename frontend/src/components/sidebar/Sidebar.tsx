import { useState, useEffect, Fragment } from 'react';
import classNames from 'classnames';

import { useByohNavigation, useSteps } from 'hooks/index';
import { getOptionData } from 'api/index';
import {
	useOptionsStore,
	setSelectedOption,
	setSelectedTier,
} from 'state/index';

import { LoadingIndicator } from '../LoadingIndicator';
import { SectionDivider, SubSectionDivider } from '../dividers';
import { SidebarFooter } from './SidebarFooter';
import { SidebarHeader } from './SidebarHeader';

// TODO make a rollup for this
import { ColorSwatch } from './option-components/ColorSwatch';
import { CabinetColorOption } from './option-components/CabinetColorOption';
import { CabinetKnobOption } from './option-components/CabinetKnobOption';
import { CabinetPullOption } from './option-components/CabinetPullOption';
import { FlooringColorOption } from './option-components/FlooringColorOption';
import { GenericSquareImageOption } from './option-components/GenericSquareImageOption';
import { BacksplashOption } from './option-components/BacksplashOption';
import { TierOption } from './option-components/TierOption';
import { DesignerThemes } from './option-components/DesignerThemes';

import styles from './Sidebar.module.css';

export function Sidebar() {
	const [currentOptionId, setCurrentOptionId] = useState<string | null>(null);
	const [optionData, setOptionData] = useState<any>([]);
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { currentStep } = useSteps({ willAlignStepsWithUrl: false });

	const selectedTiers = useOptionsStore((state) => state.selectedTiers);
	const { searchParamsObject } = useByohNavigation();

	const fetchOptionData = async () => {
		setIsLoading(true);

		const data = await getOptionData(currentOptionId!);

		setOptionData(data);
		setIsLoading(false);
	};

	useEffect(() => {
		if (!currentOptionId) return;

		fetchOptionData();
	}, [currentOptionId]);

	useEffect(() => {
		if (!searchParamsObject?.option) return;

		setCurrentOptionId(searchParamsObject?.option);
	}, [searchParamsObject?.option]);

	return currentOptionId ? (
		<div
			className={classNames(styles.sidebar, {
				[styles.sidebarClosed]: !isSidebarOpen,
			})}
		>
			<SidebarHeader
				title={`${currentOptionId?.toUpperCase()} SELECTION`}
				currentRoom={searchParamsObject?.room ?? ''}
				currentStepName={currentStep?.name ?? ''}
				onSwipeDown={() => setIsSidebarOpen(false)}
				onSwipeUp={() => setIsSidebarOpen(true)}
			/>

			<div className={styles.content}>
				<DesignerThemes />
				<LoadingIndicator isLoading={isLoading} />
				{!isLoading &&
					optionData?.length > 0 &&
					optionData.map((section: any) => {
						return (
							<SidebarSections
								key={section.title}
								section={section}
								selectedTiers={selectedTiers}
							/>
						);
					})}
			</div>
			<SidebarFooter />
		</div>
	) : null;
}

function SidebarSections({ section, selectedTiers }: any) {
	return (
		<Fragment key={section?.title}>
			<SectionDivider key={section?.title} title={section?.title} />
			{/* Render Sections */}
			{section?.sections?.map((tempSection: any) => (
				<div
					// ! Sections can be given the same ID so that
					// ! the selected option can only be one of the options
					// ! between multiple sections
					key={`section-${tempSection.id}-${tempSection.title}`}
					className={styles.optionContainer}
				>
					<SidebarSectionOptions
						section={tempSection}
						options={tempSection.options}
						selectedTiers={selectedTiers}
						tierIdKey={section.tierIdKey}
					/>
				</div>
			))}
		</Fragment>
	);
}

function SidebarSectionOptions({
	section,
	options,
	selectedTiers,
	tierIdKey,
}: {
	section: any;
	options: any;
	selectedTiers: any;
	tierIdKey: string;
}) {
	const optionsToRender =
		selectedTiers[tierIdKey] === undefined
			? options
			: options?.filter(
					(tempOption: any) =>
						tempOption.tierIds?.some((tempId: any) =>
							Object.values(selectedTiers).includes(tempId)
						) || tempOption.type === 'tier-level'
			  );

	return optionsToRender.length > 0 ? (
		<>
			<SubSectionDivider key={`divider-${section.id}`} title={section.title} />

			{/* Render Section Options */}
			<div className={styles.optionContainer}></div>
			{optionsToRender?.map((option: any) => (
				<SidebarSubOption
					key={option.id}
					option={option}
					sectionId={section.id}
				/>
			))}
		</>
	) : null;
}

function SidebarSubOption({ option, sectionId }: any) {
	const [selectedOptions, selectedTiers] = useOptionsStore((state) => [
		state.selectedOptions,
		state.selectedTiers,
	]);

	switch (option.type) {
		case 'subheader':
			return <SubSectionDivider key={sectionId} title={option.title} />;
		case 'tier-level':
			return (
				<TierOption
					key={option.id}
					isSelected={selectedTiers[sectionId] === option?.id}
					option={option}
					onClick={() => {
						setSelectedTier({ key: sectionId, value: option?.id });
					}}
				></TierOption>
			);
		case 'cabinet-color':
			return (
				<CabinetColorOption
					key={option.id}
					option={option}
					isSelected={selectedOptions[sectionId] === option?.id}
					onClick={() => {
						setSelectedOption({ key: sectionId, value: option?.id });
					}}
				/>
			);
		case 'cabinet-knob':
			return (
				<CabinetKnobOption
					key={option.id}
					option={option}
					isSelected={selectedOptions[sectionId] === option?.id}
					onClick={() => {
						setSelectedOption({ key: sectionId, value: option?.id });
					}}
				/>
			);
		case 'cabinet-pull':
			return (
				<CabinetPullOption
					key={option.id}
					option={option}
					isSelected={selectedOptions[sectionId] === option?.id}
					onClick={() => {
						setSelectedOption({ key: sectionId, value: option?.id });
					}}
				/>
			);
		case 'flooring-color':
			return (
				<FlooringColorOption
					key={option.id}
					option={option}
					isSelected={selectedOptions[sectionId] === option?.id}
					onClick={() => {
						setSelectedOption({ key: sectionId, value: option?.id });
					}}
				/>
			);
		case 'color-swatch':
			return (
				<ColorSwatch
					key={option.id}
					option={option}
					isSelected={selectedOptions[sectionId] === option?.id}
					onClick={() => {
						setSelectedOption({ key: sectionId, value: option?.id });
					}}
				/>
			);
		case 'counter-top':
			return (
				<GenericSquareImageOption
					key={option.id}
					option={option}
					isSelected={selectedOptions[sectionId] === option?.id}
					onClick={() => {
						setSelectedOption({ key: sectionId, value: option?.id });
					}}
				/>
			);
		case 'backsplash':
			return (
				<BacksplashOption
					key={option.id}
					option={option}
					isSelected={selectedOptions[sectionId] === option?.id}
					onClick={() => {
						setSelectedOption({ key: sectionId, value: option?.id });
					}}
				/>
			);
		default:
			console.warn('Failed to render option type: ', option.type);
			return <p key={option.id}>{option.title}</p>;
	}
}
