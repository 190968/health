import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import './index.less';
import { formatTrackerValue } from '../BiometricPlan/components/TrackerCard/components/TrackerCardValue';
import {compose, withState, withHandlers, withProps} from 'recompose';



const TrackerPure = props => {

	const { measurement, placeholder, value, canReport=true } = props;
	let { suffix } = props;
	console.log(props, 'trackerProps');
	const { units = {}, label} = measurement || {};
	const unitsName = units.name || placeholder;
	let className = 'tracker-input' + (value ? ' tracker-input-reported' : '');
	return (
		<React.Fragment>
			<span>
		<Input
			className={className}
			value={value}
			autoFocus
			onClick={props.onClick}
			disabled={!canReport}
			placeholder={label}
			onChange={props.onChange}
			suffix={suffix}
			// addonAfter={unitsName}
		/>
		<span style={{marginLeft:5}}>{unitsName}</span>
		</span>
		</React.Fragment>
	);
}



const enhance = compose(
	withState('value', 'setValue', props => {
		const {measurement, report, reports=[]} = props;
		let { value=''} = props;
		if (report) {
			value = report.valueFormatted;
		}
		value = formatTrackerValue({measurement, value});
		return value;
	}),
	withHandlers(({onChange, onClick}) => {
		let timer = null;

		return {
			onChange: props => (event) => {
				const { measurement , onChange} = props;
		
				let value = event.target.value;
				//console.log(value, 'INputValue');
				value = formatTrackerValue({measurement, value});
				//console.log(value, 'FormattedValue');
				props.setValue(value);
		
				clearTimeout(timer);
		
				if (typeof onChange === 'function') {
					timer = setTimeout(
						function() {
							onChange(value);
						}.bind(this),
						1000
					);
				}
			},
			onClick: props => (e) => {
				e.preventDefault();
				e.stopPropagation();
			}
		}
	})
);

export const TrackerInput = enhance(TrackerPure);

export class Tracker extends React.Component {
	constructor(props) {
		super(props);
		//console.log(this.props);
		const {item, report} = this.props;
		const {measurement=item} = this.props;
		const { inputMask = '' } = measurement;
		//console.log(report);
		let value = this.props.value || '';
		if (report) {
			value = report.valueFormatted;
		}
		value = formatTrackerValue({measurement, value});
 
		this.state = {
			value
		};
		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
	}
	static propTypes = {
		onChange: PropTypes.func,
		item: PropTypes.object,
		value: PropTypes.string
	};
	static defaultProps = {
		value: ''
	};

	onChange(event) {
		const props = this.props;
		const { item } = props;

		let value = event.target.value;
		console.log(value);
		value = formatTrackerValue({measurement:item, value});
		console.log(value);
		this.setState({ value: value });

		clearTimeout(this.timer);

		if (typeof this.props.onChange === 'function') {
			this.timer = setTimeout(
				function() {
					props.onChange(value);
				}.bind(this),
				500
			);
		}
	}

	onClick(e) {
		e.preventDefault();
            e.stopPropagation();
	}

	render() {
		const { item, placeholder } = this.props;
		let {suffix } = this.props;
		const { measurement=item } = this.props;
		const { value } = this.state;

		const { units = {}, inputMask = '' } = measurement;
		const unitsName = units.name || placeholder;
		let className = 'tracker-input' + (value ? ' tracker-input-reported' : '');

		
		return (
			<Input
				className={className}
				value={value}
				autoFocus
				onClick={this.onClick}
				//formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, '/')}
				// formatter={value => {
				//
				//
				//
				//     if (inputMask !== '') {
				//
				//
				//         return VMasker.toPattern(value, inputMask)
				//     } else {
				//         return VMasker.toNumber(value);
				//     }
				// }}
				//parser={value => VMasker.toPattern(value, inputMask)}
				//parser={value => value.replace(/\$\s?|(,*)/g, '')}
				placeholder={unitsName}
				onChange={this.onChange}
				suffix={suffix}
			/>
		);
	}
}
// export const TrackerInput = Tracker;
export default Tracker;

export class TrackerUncontrolled extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value
		};
		this.onChange = this.onChange.bind(this);
	}
	static propTypes = {
		item: PropTypes.object,
		value: PropTypes.string
	};
	static defaultProps = {
		value: null
	};

	onChange(value) {
		this.setState({ value: value });
	}

	render() {
		const { item = {} } = this.props;

		const { value } = this.state;
		const { units = {}, inputMask } = item;
		const unitsName = units.name || '';

		let className = 'tracker-input' + (value ? ' tracker-input-reported' : '');

		return (
			<Input
				className={className}
				value={value}
				//formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, '/')}
				// formatter={value => {
				//
				//     if (inputMask !== '') {
				//
				//         return VMasker.toPattern(value, inputMask)
				//     } else {
				//
				//         return VMasker.toNumber(value);
				//     }
				//
				// }}
				//parser={value => VMasker.toPattern(value, inputMask)}
				//parser={value => value.replace(/\$\s?|(,*)/g, '')}
				placeholder={unitsName}
				onChange={this.onChange}
			/>
		);
	}
}
