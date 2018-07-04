import React from 'react';
import moment from 'moment';
import {withRouter} from 'react-router';
import {compose, withHandlers} from 'recompose';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';


const formatAxis =  (tickItem) => {
    return moment(tickItem).format('MM/DD');
}

export const RiskLevelGraph = props => {
    const {items=[], handleClick} = props
    return <ResponsiveContainer height={300}  >
        <AreaChart   data={items}  >

        <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="65%" stopColor="#93ECEE" stopOpacity={1}/>
            <stop offset="95%" stopColor="#93ECEE" stopOpacity={0.5}/>
            </linearGradient>
        </defs>

            <XAxis dataKey="date" tickFormatter={formatAxis} tickCount={1} minTickGap={50} />
            <YAxis width={30} domain={[0, 100]}/>
            <Tooltip/>
            <Area type='monotone' dataKey='value' stroke='#48a5dc' fill="url(#colorUv)" strokeWidth={1} name="Adhrence" onClick={handleClick}  />
        </AreaChart>

    </ResponsiveContainer>
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
