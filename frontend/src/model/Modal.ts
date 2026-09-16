import { makeObservable, observable, action } from 'mobx';

class Modal {
	isOpen = false;
	modal: React.ReactNode | undefined;

	constructor() {
		makeObservable(this, {
			isOpen: observable,
			modal: observable,
			toggle: action,
			setModalOpen: action,
			setModal: action,
			showModal: action,
		});
	}

	toggle() {
		this.isOpen = !this.isOpen;
	}

	setModalOpen(isOpen: boolean) {
		this.isOpen = isOpen;
	}

	setModal(modal: React.ReactNode, isOpen = true) {
		this.modal = modal;
		this.isOpen = isOpen;
	}

	// * Should be used as default since it will just automatically show
	showModal(modal: React.ReactNode) {
		console.log('showing modal...');
		this.modal = modal;
		this.isOpen = true;
	}
}

export default new Modal();
