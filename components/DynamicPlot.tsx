// libraries
import Plot from 'react-plotly.js';
import { TextField } from '@rmwc/textfield';
import { Fab } from '@rmwc/fab';
import { useState } from 'preact/hooks';
// types
import {
  Color,
  Config as PlotConfig,
  /*Frame,*/ Layout as PlotLayout,
  PlotData,
  Transition,
} from 'plotly.js';
import { LoadableComponent } from 'next/dynamic';

/**
 * Here we extend types from `@types/plotly.js` to add properties
 * that have not yet been added. See:
 * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/plotly.js
 */
interface UpdatedPlotData extends PlotData {
  alphahull: number;
  color: Color;
  opacity: number;
}
type Config = Partial<PlotConfig>;
type Data = Partial<UpdatedPlotData>;
interface UpdatedPlotLayout extends PlotLayout {
  transition: Transition;
}
type Layout = Partial<UpdatedPlotLayout>;

// utilities
const repeat = (n: number) => (f: Function) => (x: number): any => {
  if (n > 0) return repeat(n - 1)(f)(f(x));
  else return x;
};

const getRandomizedArray = (lowerBound: number, upperBound: number) => (
  n: number,
) => {
  const array: Array<number> = [];
  return repeat(n)(() =>
    array.push(getRandomArbitrary(lowerBound, upperBound)),
  )(1);
};

const getRandomArbitrary = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

const DynamicPlot: LoadableComponent = () => {
  const handleClick = () => {
    setX(getRandomizedArray(-4, 4)(vertexNumber));
    setY(getRandomizedArray(-4, 4)(vertexNumber));
    setZ(getRandomizedArray(-4, 4)(vertexNumber));
  };

  const [vertexNumber, setVertexNumber] = useState(12);
  const [x, setX] = useState(getRandomizedArray(-4, 4)(vertexNumber));
  const [y, setY] = useState(getRandomizedArray(-4, 4)(vertexNumber));
  const [z, setZ] = useState(getRandomizedArray(-4, 4)(vertexNumber));

  console.info(
    `Got arrays...
  x: ${x}
  y: ${y}
  z: ${z}
  `,
  );

  // `react-plotly.js` config
  const config: Config = {
    displayModeBar: false,
    responsive: true,
  };

  const data: Data[] = [
    {
      type: 'scatter3d',
      mode: 'markers',
      x: x,
      y: y,
      z: z,
      marker: {
        color: '#d50000',
        size: 2,
      },
    },
    {
      alphahull: 0,
      opacity: 0.5,
      color: '#ff6e00',
      type: 'mesh3d',
      x: x,
      y: y,
      z: z,
    },
  ];

  const layout: Layout = {
    autosize: true,
    title: 'Plato',
    transition: {
      duration: 2000,
      easing: 'cubic-in-out',
    },
  };

  return (
    <>
      <Plot
        config={config}
        data={data}
        layout={layout}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
      />
      <TextField
        outlined
        label='# of Vertices'
        type='number'
        value={vertexNumber}
        onChange={evt => setVertexNumber(evt.currentTarget.value)}
      />
      <Fab
        label='Render'
        theme={['primaryBg', 'onPrimary']}
        onClick={handleClick}
      />
    </>
  );
};

export default DynamicPlot;
