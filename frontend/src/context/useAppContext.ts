import { createContext, useContext } from 'react';
import App from '../model/App';

export const app = new App(
	import.meta.env.VITE_GTM_ID ?? '',
	import.meta.env.VITE_LOGROCKET_ID ?? '',
	import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? ''
);

export const AppContext = createContext(app);
export const useAppContext = () => useContext(AppContext);
