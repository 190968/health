import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withHandlers } from 'recompose';
import {
	AreaChart,
	Area,
	LineChart,
	XAxis,
	YAxis,
	BarChart,
	Bar,
	ReferenceLine,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer
} from 'recharts';
import { LoadingBox, EmptyList } from '../../../../../../components/Loading';

const COLORS = [ '#51ade2', '#ba51e2', '#0088FE', '#00C49F', '#FFBB28', '#FF8042' ];

const AreaCustomPure = (props) => {
	const { i, getValue, ...otherProps } = props;
	return (
		<Area {...otherProps} dataKey={getValue} type="monotone" stackId="1" connectNulls={true} activeDot={{ r: 4 }} />
	);
};

const AreaCustom = withHandlers({
	getValue: (props) => (info) => {
		const { i } = props;
		const report = info['report_' + i] || {};
		return report.value || null;
	}
})(AreaCustomPure);

const labelFormatter = (label) => {
	return moment(label).format('l');
};
const valueFormatter = (value, name, props) => {
	// console.log(value);
	// console.log(name);
	//console.log(props);
	return value;
};
export default class TrackerChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//   tab:''
		};
		this.formatDate = this.formatDate.bind(this);
		this.formatTooltip = this.formatTooltip.bind(this);
		this.getValue = this.getValue.bind(this);
	}

	static propTypes = {
		date: PropTypes.string
	};

	formatDate(value) {
		return moment(value).format('M/D');
	}

	formatTooltip(data, i) {
		//console.log(data);
		const { payload } = data;
		if (payload.length === 0) return null;
		const info = payload[0].payload || {};
		const date = info.date || '';
		const value = this.getValue(info, i);
		return (
			<div style={{ backgroundColor: '#fff', padding: 5 }}>
				{moment(date).format('l')} : {value}
			</div>
		);
	}

	getValue(info, i) {
		const report = info['report_' + i] || {};
		// console.log(i);
		// console.log(info);
		// console.log(report);
		//console.log(report.value || null);
		return report.value || null;
	}

	render() {
		const { data, units, item, loading, size = 'full' } = this.props;
		 console.log(this.props, 'trackerProps');
		const graph = item.graph || this.props.graph;
		const { criticalRange, normalRange } = item || {};
		const { min: criticalRangeMin, max: criticalRangeMax } = criticalRange || {};
		const { min: normalRangeMin, max: normalRangeMax } = normalRange || {};

        let graphHtml = '';
        const fullWidth = size === 'full';

		if (loading) {
			if (fullWidth) {
				return <LoadingBox />;
			}
			return (
				<LineChart width={300} height={100}>
					<CartesianGrid stroke="#eee" strokeDasharray="5 5" />
					Loading
				</LineChart>
			);
		}
		const dataWithReports = data.filter(d => d.reports.length > 0);
		if (dataWithReports.length === 0) {
			return <EmptyList noImage={!fullWidth}>{fullWidth && 'No Data'}</EmptyList>;
		}
		const { getLabels = [] } = units || {};
		// console.log(data);
		let sizeOpts = { width: 300, height: 200 };
		if (size === 'tiny') {
			// sizeOpts.width = 200;
			// sizeOpts.height = 30;
		}
		const showDash = size !== 'tiny' && !fullWidth;
		console.log(graph);
		switch (graph) {
			default:
				// graphHtml = <LineChart {...sizeOpts} data={data}>
				//         {!fullWidth && <CartesianGrid strokeDasharray="3 3"/>}
				//         <Tooltip content={this.formatTooltip}/>

				//         <Line type='monotone' dataKey={this.getValue} stroke='#1089ff' activeDot={{r: 4}} strokeWidth={2}
				//               connectNulls={true}/>
				//         {!fullWidth && <CartesianGrid strokeDasharray="3 3"/>}
				//         {criticalRangeMin && <ReferenceLine y={criticalRangeMin} stroke="red" strokeDasharray="3 3"/>}
				//         {criticalRangeMax && <ReferenceLine y={criticalRangeMax} stroke="red" strokeDasharray="3 3"/>}

				//         {normalRangeMin && <ReferenceLine y={normalRangeMin} stroke="#c9d9e8" strokeDasharray="3 3"/>}
				//         {normalRangeMax && <ReferenceLine y={normalRangeMax} stroke="#c9d9e8" strokeDasharray="3 3"/>}
				//     </LineChart>;
				//    // break;
				// case 'area':

				//console.log(data);
				//{ name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
				let maxReports = 0;
				const dataFormatted = data.map((info) => {
					const { date, reports = [] } = info;
					const reportNum = reports.length;
					let otherValues = {};
					if (maxReports < reportNum) {
						maxReports = reportNum;
					}
					//if (reports.length > 0) {
					reports.map((report, i) => {
						otherValues['report_' + i] = report;
						return null;
					});
					//console.log(otherValues);
					return { date, ...otherValues };
					// } else {
					//     return null;
					// }
				});
				// console.log(criticalRangeMin);
				// console.log(criticalRangeMax);
				const reports_iterations = Array.apply(null, Array(maxReports)).map((x, i) => i);
				// const reports_arr = data.map(info => info.reports && info.reports.length || 0);
				// const maxReports = max(reports_nums);
				console.log(dataFormatted, 'Reports');
				// console.log(maxReports, 'maxReports');
				// console.log(reports_iterations, 'Reports');

				if (size === 'tiny') {
					graphHtml = (
						<AreaChart
							{...sizeOpts}
							data={dataFormatted}
							// margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
						>
							<defs>
								{COLORS.map((color, i) => (
									<linearGradient key={i} id={'color_' + i} x1="0" y1="-1" x2="0" y2="1.3">
										<stop offset="0%" stopColor={color} stopOpacity={0.1} />
										<stop offset="100%" stopColor="#fff" stopOpacity={1} />
									</linearGradient>
								))}
							</defs>

							{reports_iterations.map((i) => {
								//console.log(1111);
								const colorI = i % COLORS.length;
								const label = getLabels.find((label, il) => i === il);
								const color = COLORS[colorI]; //'#51ade2';
								return (
									<Area
										i={i}
										key={i}
										name={label}
										dataKey={(info) => this.getValue(info, i)}
										type="monotone"
										stackId="1"
										connectNulls={true}
										activeDot={{ r: 2 }}
										stroke={color}
										fill={'url(#color_' + colorI + ')'}
										//dot={{ stroke: color, strokeWidth: 2, r: 3, fill: 'white' }}
									/>
								);
							})}
							<XAxis
									dataKey="date"
									padding={{ left: 20, right: 20 }}
									tickFormatter={this.formatDate}
									tickCount={7}
									interval="preserveStartEnd"
									// axisLine={true}
									// tickLine={false}
									height={20}
								/>
						</AreaChart>
					);
				} else {
					graphHtml = (
						<AreaChart
							{...sizeOpts}
							data={dataFormatted}
							margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
						>
							{showDash && <CartesianGrid strokeDasharray="3 3" />}
							<defs>
								{COLORS.map((color, i) => (
									<linearGradient key={i} id={'color_' + i} x1="0" y1="-1" x2="0" y2="1.3">
										<stop offset="0%" stopColor={color} stopOpacity={0.1} />
										<stop offset="100%" stopColor="#fff" stopOpacity={1} />
									</linearGradient>
								))}
							</defs>
							{fullWidth && (
								<XAxis
									dataKey="date"
									padding={{ left: 20, right: 20 }}
									tickFormatter={this.formatDate}
									tickCount={7}
									interval="preserveStartEnd"
									axisLine={true}
									tickLine={false}
								/>
							)}
							{fullWidth && <YAxis/>}


							<Tooltip
								labelFormatter={labelFormatter}
								formatter={valueFormatter} /*content={this.formatTooltip}*/
							/>

							{reports_iterations.map((i) => {
								//console.log(1111);
								const colorI = i % COLORS.length;
								const label = getLabels.find((label, il) => i === il);
								const color = COLORS[colorI]; //'#51ade2';
								return (
									<Area
										i={i}
										key={i}
										name={label}
										dataKey={(info) => this.getValue(info, i)}
										type="monotone"
										stackId="1"
										connectNulls={true}
										activeDot={{ r: 4 }}
										stroke={color}
										fill={'url(#color_' + colorI + ')'}
										dot={{ stroke: color, strokeWidth: 2, r: 3, fill: 'white' }}
									/>
								);
							})}

							{/* {foreach( ) {

                          }}
                    <Area type='monotone' dataKey='uv' stackId="1" stroke='#8884d8' fill='#8884d8' />
 */}

							{/* {criticalRangeMin && <ReferenceLine y={criticalRangeMin} stroke="red" strokeDasharray="3 3"/>}
                    {criticalRangeMax && <ReferenceLine y={criticalRangeMax} stroke="red" strokeDasharray="3 3"/>} */}

							{/*normalRangeMin && <ReferenceLine y={normalRangeMin} stroke="#c9d9e8" strokeDasharray="3 3"/>}
                    {normalRangeMax && <ReferenceLine y={normalRangeMax} stroke="#c9d9e8" strokeDasharray="3 3"/>} */}
						</AreaChart>
					);
				}
				break;
			case 'bar_not-working':
				graphHtml = (
					<BarChart {...sizeOpts} data={data}>
						<Bar dataKey={this.getValue} fill="#d2eaff" />
						<Tooltip content={this.formatTooltip} />
						{criticalRangeMin && <ReferenceLine y={criticalRangeMin} stroke="red" strokeDasharray="3 3" />}
						{criticalRangeMax && <ReferenceLine y={criticalRangeMax} stroke="red" strokeDasharray="3 3" />}

						{normalRangeMin && <ReferenceLine y={normalRangeMin} stroke="#c9d9e8" strokeDasharray="3 3" />}
						{normalRangeMax && <ReferenceLine y={normalRangeMax} stroke="#c9d9e8" strokeDasharray="3 3" />}
					</BarChart>
				);
				break;
		}

		if (fullWidth || size === 'tiny') {
			return <ResponsiveContainer>{graphHtml}</ResponsiveContainer>;
		}
		return graphHtml;
	}
}
