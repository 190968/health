import React from 'react'

import {Checkbox} from 'antd';
const CheckboxGroup = Checkbox.Group;


const vertStyle = {
    display: 'block',
    marginLeft: 0,
};


export const Checkboxes = props => {
    const {options, value, isVertical=false, simple=false, disabled=false} = this.props;
    //const {value} = this.state;


    let radioStyle = {};
    if (!simple && isVertical) {
        radioStyle = vertStyle;
    }
    let plainOptions = [];
    options.map((option) => {
        const coid = option.value;
        const name = option.label;

        plainOptions.push(<Checkbox key={coid} value={coid} style={radioStyle} >{name}</Checkbox>);
        return option;
    });


    return <CheckboxGroup value={value} onChange={props.onChange} disabled={disabled} >{plainOptions}</CheckboxGroup>
} 