// libraries
import Plot from 'react-plotly.js';
// types
import {
  Color,
  /*Config, Frame,*/ Layout as PlotLayout,
  PlotData,
  Transition,
} from 'plotly.js';

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

const fillRandomizedArray = (
  array: Array<number>,
  lowerBound: number,
  upperBound: number,
) => (n: number) => {
  return repeat(n)(
    (x: number) => array.push(getRandomArbitrary(lowerBound, upperBound)) * x,
  )(1);
};

const getRandomArbitrary = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

// data
const x: Array<number> = [];
const y: Array<number> = [];
const z: Array<number> = [];

// `react-plotly.js` config
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
    alphahull: -1,
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
  height: 480,
  scene: {
    aspectratio: {
      x: 1,
      y: 1,
      z: 1,
    },
    camera: {
      center: {
        x: 0,
        y: 0,
        z: 0,
      },
      eye: {
        x: 1.25,
        y: 1.25,
        z: 1.25,
      },
      up: {
        x: 0,
        y: 0,
        z: 1,
      },
    },
    xaxis: {
      type: 'linear',
      zeroline: true,
    },
    yaxis: {
      type: 'linear',
      zeroline: true,
    },
    zaxis: {
      type: 'linear',
      zeroline: true,
    },
  },
  title: 'Plato',
  width: 477,
  transition: {
    duration: 2000,
    easing: 'cubic-in-out',
  },
};

fillRandomizedArray(x, -4, 4)(12);
fillRandomizedArray(y, -4, 4)(12);
fillRandomizedArray(z, -4, 4)(12);

console.info(
  `Arrays filled!
  x: ${x}
  y: ${y}
  z: ${z}
  `,
);

const DynamicPlot: React.FC = () => <Plot data={data} layout={layout} />;

export default DynamicPlot;
