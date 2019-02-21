
import React from 'react';
import {Input, Icon} from 'antd';
import {compose, withHandlers, withState} from 'recompose';
const Search = Input.Search;
const SearchFieldPure = props => {
	const {value, onChange, disabled = false, onReset, ...otherProps} = props; 
	const suffix = value ? <Icon type="close-circle" onClick={onReset} /> : <Icon type="search"  />
	return <Input
	{...otherProps}
    value={value}
    disabled={disabled}
	onChange={props.onChange}
	suffix={suffix}
/>
}



const enhance = compose(
	withState('value', 'setValue', props => {
		let { value } = props;
		return value;
	}),
	withHandlers(({onChange}) => {
		let timer = null

		return {
			onReset: props => (event) => {
				const { onChange, setValue } = props;
				setValue();
				onChange();
			},
			onChange: props => (event) => {
				const { onChange } = props;
		
				let value = event.target.value;
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

export const SearchField = enhance(SearchFieldPure);

export default SearchField;