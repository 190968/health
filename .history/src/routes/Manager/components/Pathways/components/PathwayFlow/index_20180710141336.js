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


  const code =
      `st=>start: Begin
e=>end: End
op1=>operation: Operation 1|department1
op2=>operation: Operation 2|department2
sub=>subroutine: Go To Google|external:>http://www.google.com
cond=>condition: Google?

st(right)->op1(right)->op2(right)->cond(yes)->sub(bottom)
cond(no)->e`;

cosnt code2 = 'st=>start: Start:>http://www.google.com[blank]\n' +
'e=>end:>http://www.google.com\n' +
'op1=>operation: My Operation\n' +
'op2=>operation: Stuff|current\n' +
'sub1=>subroutine: My Subroutine\n' +
'cond=>condition: Yes \n' + // use cond(align-next=no) to disable vertical align of symbols below
'or No?\n:>http://www.google.com\n' +
'c2=>condition: Good idea|rejected\n' +
'io=>inputoutput: catch something...|request\n' +
'\n' +
'st->op1(right)->cond\n' +
'cond(yes, right)->c2\n' + // conditions can also be redirected like cond(yes, bottom) or cond(yes, right)
'cond(no)->sub1(left)->op1\n' + // the other symbols too...
'c2(true)->io->e\n' +
'c2(false)->op2->e'  //allow for true and false in conditionals



const convertElementsToCode = elements => {
    let code = '';
     let st = '';
     let e = '';
     let vars = '';
     let rules ='st->';
    const elementsTotal = elements.length;
    console.log(elements);
     elements.map((element, i) => {
        const {typeText} = element;
        let label = 'op'+i;
        if (i === 0) {
            label = 'st';
            // start element
            st = label+'=>start: '+typeText+'\n';
            code +=st;
        } else if (elementsTotal === i+1) {
            // end element
            e = 'e=>end: '+typeText+'\n';
            code +=e;
        } else {
            label = 'op'+i;
            // just add element
            code += label+'=>operation: '+typeText+'\n';
            rules += label+'->';
        }

        

        return null;
     });

     rules += 'e';
     console.log(code);
     console.log(rules);
     

     return code+rules;
}
const PathwayFlow = props => {
    const {pathway} = props;
    const {elements=[]} = pathway;

    const chartCode = convertElementsToCode(elements);
    return <div>
    <Flowchart
    chartCode={chartCode}
    options={opt}
  />
   </div>
}

export default PathwayFlow;