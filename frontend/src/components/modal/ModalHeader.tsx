import classNames from 'classnames';

import ModalState from '../../model/Modal';
import { CircleButton } from '../buttons';
import { colors } from 'styles/index';

import styles from './ModalHeader.module.css';

interface Props {
	title: string;
	color?: string;
	className?: string;
}

export const ModalHeader = ({
	title,
	color = colors.vmDarkBlue,
	className = '',
}: Props) => {
	return (
		<div className={classNames(styles.modalHeader, className)}>
			<div style={{ width: 48 }} />
			<h2>{title}</h2>
			<CircleButton onClick={() => ModalState.setModalOpen(false)}>
				x
			</CircleButton>
		</div>
	);
};
