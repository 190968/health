
import React from 'react';
import {Input, InputNumber} from 'antd';
import {compose, withHandlers, withState} from 'recompose';

const InputFieldPure = props => {
	const {value, onChange, disabled = false, isNumber = false} = props; 
	if (!isNumber) {
		return <Input
			value={value}
			disabled={disabled}
			onChange={props.onChange}
		/>
	} else {
		return <InputNumber
			value={value}
			disabled={disabled}
			onChange={props.onChange}
		/>
	}
	
}



const enhance = compose(
	withState('value', 'setValue', props => {
		let { value } = props;
		return value;
	}),
	withHandlers(({onChange}) => {
		let timer = null

		return {
			onChange: props => (event) => {
				const { onChange, isNumber=false } = props;
		
				let value = isNumber ? event : event.target.value;
				props.setValue(value);
				// console.log(value, 'value');
		
				clearTimeout(timer);
		
				if (typeof onChange === 'function') {
					timer = setTimeout(
						function() {
							onChange(value);
						}.bind(this),
						1000
					);
				}
			}
		}
	})
);

export const InputField = enhance(InputFieldPure);

export default InputField;