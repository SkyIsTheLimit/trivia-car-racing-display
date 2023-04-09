import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'animate.css';
import { AudioProvider } from '@/components/context/audio';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AudioProvider>
      <Component {...pageProps} />
    </AudioProvider>
  );
}
