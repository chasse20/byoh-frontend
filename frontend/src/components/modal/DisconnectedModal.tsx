import { PrimaryButton } from '../buttons';
import { ModalBase } from './ModalBase';

export function DisconnectedModal() {
	return (
		<ModalBase title="Disconnected">
			<h1>!</h1>
			<h4 style={{ textAlign: 'center' }}>
				You've been disconnected from the server, please reconnect to continue.
			</h4>
			<PrimaryButton style={{ marginTop: 'auto', marginBottom: 24 }}>
				RECONNECT
			</PrimaryButton>
		</ModalBase>
	);
}
