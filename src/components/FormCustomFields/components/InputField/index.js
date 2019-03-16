
import React from 'react';
import {Input, InputNumber} from 'antd';
import {compose, branch,withHandlers, withState, renderComponent} from 'recompose';
const TextArea = Input.TextArea;
const InputFieldPure = props => {
	const {value, asTextArea=false, onChange, disabled = false, isNumber = false} = props; 
	if (!isNumber) {
		if (asTextArea) {
			return <TextArea
			value={value}
			disabled={disabled}
			onChange={props.onChange}
			autosize={{minRows:1}}
		/>
		}
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

const InputFieldPureNoStatePure = props => {
	const {value, asTextArea=false, onChange, disabled = false, isNumber = false} = props; 
	if (!isNumber) {
		if (asTextArea) {
			return <TextArea
			defaultValue={value}
			disabled={disabled}
			onChange={props.onChange}
			autosize={{minRows:1}}
		/>
		}
		return <Input
			defaultValue={value}
			disabled={disabled}
			onChange={props.onChange}
		/>
	} else {
		return <InputNumber
			defaultValue={value}
			disabled={disabled}
			onChange={props.onChange}
		/>
	}
}

const InputFieldPureNoState = withHandlers(({onChange}) => {
	let timer = null

	return {
		onChange: props => (event) => {
			const { onChange, isNumber=false, timeout=1000 } = props;
			let value = isNumber ? event : event.target.value;
	
			clearTimeout(timer);
	
			if (typeof onChange === 'function') {
				timer = setTimeout(
					function() {
						onChange(value);
					}.bind(this),
					timeout
				);
			}
		}
	}
})(InputFieldPureNoStatePure);

const enhance = compose(
	branch(props => props.noState, renderComponent(InputFieldPureNoState)),
	withState('value', 'setValue', props => {
		let { value } = props;
		return value;
	}),
	withHandlers(({onChange}) => {
		let timer = null

		return {
			onChange: props => (event) => {
				const { onChange, isNumber=false, timeout=1000 } = props;
		
				let value = isNumber ? event : event.target.value;
				props.setValue(value);
				// console.log(value, 'value');
		
				clearTimeout(timer);
		
				if (typeof onChange === 'function') {
					timer = setTimeout(
						function() {
							onChange(value);
						}.bind(this),
						timeout
					);
				}
			}
		}
	})
);

export const InputField = enhance(InputFieldPure);

export default InputField;