import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import styles from './Viewport.module.css';
import { useAppContext } from 'context/index';
import { PrimaryButton } from 'components/buttons';

interface Props {
	title?: string;
	imgSrc?: string;
}

export const StreamViewport = observer(({ imgSrc }: Props) => {
	const app = useAppContext();
	const viewportRef = useRef<HTMLDivElement>(null);

	const isStreamDisconnected = app.Stream == null || !app.Stream.IsConnecting;
	app.Stream?.SupportedLevels == undefined ||
		app.Stream?.SupportedLevels == null;

	useEffect(() => {
		if (!viewportRef.current) return;

		console.log('creating stream...');
		app.CreateStream(viewportRef.current);

		return () => {
			app.DestroyStream();
		};
	}, [viewportRef, app]);

	return (
		<div
			ref={viewportRef}
			id="video-stream"
			className={styles.viewport}
			style={{
				backgroundImage: isStreamDisconnected ? `url(${imgSrc})` : undefined,
			}}
		>
			{isStreamDisconnected && (
				<PrimaryButton
					className={styles.streamButton}
					onClick={() => {
						app.StreamAsync();
					}}
				>
					VIEW IN 3D
				</PrimaryButton>
			)}
		</div>
	);
});
