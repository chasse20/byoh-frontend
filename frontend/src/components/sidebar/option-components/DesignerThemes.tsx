import { useEffect, useState } from 'react';

import { useOptionsStore, setSelectedOption } from 'state/index';
import { getDesignerThemeData } from 'api/index';
import { SectionDivider } from 'components/dividers';
import { DesignerThemeTile } from './DesignerThemeTile';
import styles from './DesignerThemes.module.css';

const DESIGNER_THEME_SECTION_ID = 'designer-themes';

export function DesignerThemes() {
	const [designerThemes, setDesignerThemes] = useState<any>([]);
	const selectedOptions = useOptionsStore((state) => state.selectedOptions);

	const fetchDesignerThemes = async () => {
		const designerThemeData = await getDesignerThemeData();

		setDesignerThemes(designerThemeData);
	};

	useEffect(() => {
		fetchDesignerThemes();
	}, []);

	return (
		<div className={styles.container}>
			<SectionDivider
				key="designer-themes-section"
				title={designerThemes?.title ?? 'Designer Themes'}
			/>
			<div className={styles.optionContainer}>
				{designerThemes?.themes?.map((theme: any) => {
					const isSelected =
						selectedOptions[DESIGNER_THEME_SECTION_ID] === theme.id;

					const onClick = () => {
						setSelectedOption({
							key: DESIGNER_THEME_SECTION_ID,
							value: theme.id,
						});
					};

					return (
						<DesignerThemeTile
							key={theme.id}
							theme={theme}
							isSelected={isSelected}
							onClick={onClick}
						/>
					);
				})}
			</div>
		</div>
	);
}
