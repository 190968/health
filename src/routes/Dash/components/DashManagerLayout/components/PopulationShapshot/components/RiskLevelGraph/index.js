import React from 'react';
import {withRouter} from 'react-router';
import {compose, withHandlers} from 'recompose';
import {PieChart, Pie, Sector, Cell, Legend, ResponsiveContainer} from 'recharts';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel2 = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    return ((percent * 100).toFixed(0))+'%';
    const radius = outerRadius+40;//innerRadius + ( - innerRadius)  ;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text  x={x} y={y} fill="#000" dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const RiskLevelGraph = props => {
    const {items=[], handleClick} = props
    // console.log(items);
    return <ResponsiveContainer height={150}  ><PieChart  margin={{ top: 5, right: 5, bottom: 5, left: 5 }} >
        <Pie
            data={items}
            dataKey='value'
            // labelLine={false}
            outerRadius={30}
            fill="#8884d8"
            label={renderCustomizedLabel}
            onClick={handleClick}
            innerRadius={20}
           
        >
            {
                items.map((entry, index) => {
                     return <Cell fill={entry.color} key={index}/>;
                 })
            }
        </Pie>
        <Legend />
    </PieChart></ResponsiveContainer>
}


const enhance = compose(
    withRouter,
    withHandlers({
        handleClick: props =>  (data, index) => {
            props.history.push('/patients');
        }
    })
)
export default enhance(RiskLevelGraph);
