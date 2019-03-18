
import React from 'react';
import { Input, Select } from 'antd';
import { compose, withHandlers, withState, withStateHandlers } from 'recompose';
const InputGroup = Input.Group;
const Option = Select.Option;

export const OPTIONS_CONDITIONAL = [
    { key: 'equal', label: 'Equal' },
    { key: 'less_than', label: 'Less Than' },
    { key: 'less_eq_than', label: 'Less/Equal Than' },
    { key: 'more_than', label: 'More Than' },
    { key: 'more_eq_than', label: 'More/Equal Than' },
    { key: 'between', label: 'Between' },
]

// const InputFieldPure = props => {
//     const {condition, onChange, disabled = false} = props; 

//     const isBetween = condition === 'between';
// 	return <InputGroup compact>
//     <Select onChange={props.updateCondition}>
//         {OPTIONS_CONDITIONAL.map(option => <Option key={option.key} value={option.key}>{option.label}</Option>)}
//     </Select>
//     <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
//     {isBetween &&  <>
//     <Input
//       style={{
//         width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff',
//       }}
//       placeholder="~"
//       disabled
//     />
//     <Input style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="Maximum" />
//     </>}

//   </InputGroup>
// }


const InputFieldPure = props => {
    const { form, conditionKey = 'condition', renderInput } = props;
    const { getFieldDecorator, getFieldValue } = form;
    const { condition='equal', min, max, disabled = false } = props;

    return <InputGroup compact>
        {getFieldDecorator(conditionKey, {
            initialValue:condition
        })(
            <Select style={{ width: 150 }} defaultActiveFirstOption>
                {OPTIONS_CONDITIONAL.map(option => <Option key={option.key} value={option.key}>{option.label}</Option>)}
            </Select>
        )}

        {getFieldDecorator('ruleValue', {
            initialValue:min
        })(
            renderInput ? renderInput() : <Input style={{ width: 100 }} placeholder={getFieldValue(conditionKey) === 'between' ? 'From' : 'Value'} />
        )}

        {getFieldValue(conditionKey) === 'between' && <>
            <Input
                style={{
                    width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff',
                }}
                placeholder="~"
                disabled
            />
            {getFieldDecorator('ruleValueEnd', {
            })(
                <Input style={{ width: 100, borderLeft: 0 }} placeholder="To" />
            )}

        </>}

    </InputGroup>
}



const enhance = compose(
    withStateHandlers(props => {
        const {value} = props;
        
        const { condition, min } = value;
        return { condition, min, max:null }
    }, {
            updateCondition: props => (condition) => {
                return { condition }
            }
        }),
    // withState('value', 'setValue', props => {
    // 	let { value } = props;
    // 	return value;
    // }),
    // withHandlers(({onChange}) => {
    // 	let timer = null

    // 	return {
    // 		onChange: props => (event) => {
    // 			const { onChange } = props;

    // 			let value = event.target.value;
    // 			props.setValue(value);
    // 			// console.log(value, 'value');

    // 			clearTimeout(timer);

    // 			if (typeof onChange === 'function') {
    // 				timer = setTimeout(
    // 					function() {
    // 						onChange(value);
    // 					}.bind(this),
    // 					1000
    // 				);
    // 			}
    // 		}
    // 	}
    // })
);

export const InputWithConditionField = enhance(InputFieldPure);