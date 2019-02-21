/**
 * Created by Pavel on 06.12.2017.
 */
import React from 'react';

import { Checkbox} from 'antd';
const CheckboxGroup = Checkbox.Group;
const vertStyle = {
    display: 'block',
    marginLeft: 0,
};
 
const CohortsForm = props => {
    const { options=[], label } = props;

    return (

        
        <CheckboxGroup  >{options.map((option) => {
            const coid = option.id;
            const name = option.label;
            return <Checkbox key={coid} value={coid} style={vertStyle} >{name}</Checkbox>;
        })}</CheckboxGroup>

    );
}

export default CohortsForm;
