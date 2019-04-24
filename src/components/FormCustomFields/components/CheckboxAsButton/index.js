import React from 'react';
import { compose, withHandlers } from 'recompose';


const CheckboxPure = props => {
    const {isChecked, disabled=false, label, onChange} = props;
    const checked = isChecked ? 'ant-radio-button-wrapper-checked' : '';
    return <div onClick={!disabled && onChange} className={'ant-radio-button-wrapper '+checked}>{label}</div>;
}

const enhance = compose(withHandlers({
    onChange: props => () => {
        const {value} = props;
        props.onChange(value);
    }
}));
const Checkbox = enhance (CheckboxPure);

const CheckboxAsButton = props => {
    const {options, value:checkmarked, updateCheckboxes} = props;
    console.log(checkmarked, 'checkmarked');
    return <div className={'ant-radio-group ant-radio-group-outline'}>
        {options.map((option, i) => {
            const {value, label} = option;
            const isChecked = checkmarked.includes(value);
            const disabled = false;
            return <Checkbox key={i} isChecked={isChecked} label={label} value={value} disabled={disabled} onChange={updateCheckboxes} />;
        })}
    </div>
}

export default CheckboxAsButton;