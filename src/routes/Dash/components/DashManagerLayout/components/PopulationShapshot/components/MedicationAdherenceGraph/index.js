import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router';
import { compose, withHandlers } from 'recompose';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatAxis = (tickItem) => {
	return moment(tickItem).format('MM/DD');
};

export const RiskLevelGraph = (props) => {
	const { items = [], handleClick } = props;
	return (
		<ResponsiveContainer height={150}>
			<AreaChart data={items}>
				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#5fafe0" stopOpacity={0.1} />
						<stop offset="100%" stopColor="#fff" stopOpacity={1} />
					</linearGradient>
				</defs>

				<XAxis dataKey="date" tickFormatter={formatAxis} tickCount={1} minTickGap={50} />
				<YAxis width={30} domain={[ 0, 100 ]} ticks={[ 0, 50, 100 ]} />
                <Tooltip 
                    labelFormatter={(value) => moment(value).format('L')}
                    formatter={(value, name, props) => {
                        return value+'%';
                    }}
                    />
				<Area
					type="monotone"
					dataKey="value"
					stroke="#48a5dc"
					fill="url(#colorUv)"
					strokeWidth={1}
					name="Adhrence"
					dot={{ stroke: '#48a5dc', strokeWidth: 1, r: 2, fill: 'white' }}
					onClick={handleClick}
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
};

const enhance = compose(
	withRouter,
	withHandlers({
		handleClick: (props) => (data, index) => {
			props.history.push('/patients');
		}
	})
);
export default enhance(RiskLevelGraph);
