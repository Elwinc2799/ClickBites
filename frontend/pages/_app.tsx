import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { LocationProvider } from '@/components/utils/LocationContext';


export default function App({ Component, pageProps }: AppProps) {
    return (
        <LocationProvider>
            <Component {...pageProps} />
            <ToastContainer />
        </LocationProvider>
    );
}
