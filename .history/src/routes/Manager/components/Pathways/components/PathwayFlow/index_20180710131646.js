import React from 'react';
import Flowchart from 'react-simple-flowchart';

const opt = {
    x: 0,
    y: 0,
    'line-width': 3,
    'line-length': 50,
    'text-margin': 10,
    'font-size': 14,
    'font-color': 'black',
    'line-color': 'black',
    'element-color': 'black',
    fill: 'white',
    'yes-text': 'yes',
    'no-text': 'no',
    'arrow-end': 'block',
    scale: 1,
    symbols: {
      start: {
        'font-color': 'red',
        'element-color': 'green',
        'font-weight': 'bold',
      },
      end: {
        'font-color': 'red',
        'element-color': 'green',
        'font-weight': 'bold',
      },
    },
    flowstate: {
      department1: { fill: 'pink' },
      department2: { fill: 'yellow' },
      external: { fill: 'green' },
    },
  };
  
const PathwayFlow = props => {

    return <Flowchart
    chartCode={code}
    options={opt}
  />
}

export default PathwayFlow;