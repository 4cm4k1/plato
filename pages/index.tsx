// libraries
import dynamic from 'next/dynamic';
import Head from 'next/head';
// types
import { NextPage } from 'next';

/**
 * render with SSRless dynamic import because `plotly.js` does not support SSR
 */
const DynamicPlot = dynamic(import('../components/DynamicPlot'), {
  ssr: false,
});

const IndexPage: NextPage = () => (
  <div>
    <Head>
      <title>Plato</title>
    </Head>
    <DynamicPlot />
  </div>
);

export default IndexPage;
