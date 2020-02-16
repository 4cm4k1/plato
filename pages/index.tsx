// libraries
import dynamic from 'next/dynamic';
import Head from 'next/head';
// types
import { NextPage } from 'next';
// local
import PageLayout from '../components/PageLayout';

/**
 * render with SSRless dynamic import because `plotly.js` does not support SSR
 */
const DynamicPlot = dynamic(import('../components/DynamicPlot'), {
  ssr: false,
});

const IndexPage: NextPage = () => (
  <PageLayout>
    <Head>
      <title>Plato</title>
    </Head>
    <DynamicPlot />
  </PageLayout>
);

export default IndexPage;
