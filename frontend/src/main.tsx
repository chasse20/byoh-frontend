import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import AppModel from './model/App';
import { AppContext, app } from 'context/index';

import { ModalProvider } from 'components/index';
import modalState from './model/Modal';
import { router } from './router';

import './index.css';

declare global {
	interface Window {
		app: AppModel;
	}
}

// * For debug purposes, window.app not meant to be
// * Directly interacted with by the frontend application itself
window.app = app;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AppContext.Provider value={app}>
			<ModalProvider modalState={modalState} />
			<RouterProvider router={router} />
		</AppContext.Provider>
	</React.StrictMode>
);
