import { AppProps } from 'next/app';

import 'modern-normalize/modern-normalize.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default App;
