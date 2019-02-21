import React from 'react';
import {Input, InputNumber, Col} from 'antd';
import {compose, withState, withHandlers, withProps} from 'recompose';

const InputGroup = Input.Group;

const InputUnitsPure = props => {
    const {placeholderUnits='cm or mm', value='', units=''} = props;
    return <InputGroup>
            <Col span={8}>
                <Input onChange={props.handleInput} value={value} />
            </Col>
            <Col span={4}>
                <Input onChange={props.handleUnits} value={units} placeholder={placeholderUnits}  />
            </Col>
        </InputGroup>;
}


export const prepareInputUnitsValue = (info) => {
    const {value, units} = info || {};
    return {value, units};
}

export const InputUnits = compose(
    withHandlers({
        triggerChange: props => (value) => {
            const onChange = props.onChange;
            if (onChange) {
                onChange(value);
            }
        }
    }),
    withProps(props => {
        const {value} = props;
        const {value:v, units} = value || {};
        return {value: v, units}
    }),
    withState('value', 'setValue', props=> props.value || ''),
    withState('units', 'setUnits', props=> props.units || ''),
   
    withHandlers({
        handleInput: props => (e) => {
            const value = e.target.value;
            const {units} = props;
            props.setValue(value);
            props.triggerChange({value, units});
        },
        handleUnits: props => (e) => {
            const units = e.target.value;
            const {value} = props;
            props.setUnits(units);
            props.triggerChange({value, units});
        }
    }),
)(InputUnitsPure);


    export const InputUnitsDecoratorPure = props => {
        const {getFieldDecorator, name, validatorMessage, checkInput} = props;
        return getFieldDecorator(name, {
                rules: [{ validator: checkInput}],
            }
        )(
            <InputUnits />
        )
    };

export const InputUnitsDecorator = withHandlers({
    checkInput: props => (rule, value, callback) => {
        console.log(value);
        if (value.value !== '' && value.units !== '') {
            callback();
            return;
        }
        callback('Error');
    }
})(InputUnitsDecoratorPure);

export const InputUnitsValidator = (rule, value, callback) => {
    //console.log(value);
    if (value) {
        if (value.value !== '' && value.units !== '') {
            callback();
            return;
        }
    }
    callback('Error');
}