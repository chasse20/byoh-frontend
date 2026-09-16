import { observer } from 'mobx-react';

import ModalState from '../../model/Modal';
import styles from './modal.module.css';

interface Props {
	modalState: typeof ModalState;
}

export const ModalProvider = observer(({ modalState }: Props) => {
	return modalState.isOpen ? (
		<div className={styles.scrim}>{modalState.modal}</div>
	) : null;
});
