// libraries
// @ts-ignore
import('preact/debug');
// types
import { AppProps } from 'next/app';
import { FunctionalComponent } from 'preact';
// styles
import 'modern-normalize/modern-normalize.css';
import '@material/theme/dist/mdc.theme.css';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import '@material/fab/dist/mdc.fab.css';

const App: FunctionalComponent<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default App;
