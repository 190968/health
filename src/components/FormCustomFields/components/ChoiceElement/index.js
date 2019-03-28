import React from 'react'
import {Checkbox, Radio, Select} from 'antd';
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const vertStyle = {
    display: 'block',
    marginLeft: 0,
};
const radioStyle = {
    display: 'block',
};

String.prototype.nextChar = function(i) {
	const n = i || 0;
	return String.fromCharCode(this.charCodeAt(0) + n);
}

String.prototype.prevChar = function(i) {
	const n = i || 1;
	return String.fromCharCode(this.charCodeAt(0) - n);
}
const answer_abc_num = 'a';
export const ChoiceElement = props => {
    const { mode, value, idInsteadValue=false, isMultiple=false, isDropdown=false, disabled=false, showPrefix=false, prefixAsNumber=false, onChange} = props;
    let {options=[]} = props;
    if (idInsteadValue) {
        console.log(options);
        options = options.map(o => {
            const {id, label} = o;
            return {value:id, label};
        });
        console.log(options);
    }
    if (isMultiple || mode == 'multiple') {

        
         // if it's multiple, check use checkboxes
         return <CheckboxGroup value={value} onChange={onChange} disabled={disabled} >
         {options.map((option, i) => {
             const {value, label} = option;
             const prefix = prefixAsNumber ? i+1 : answer_abc_num.nextChar((i+1));
             return <Checkbox key={i} value={value} style={vertStyle} >{showPrefix && prefix+'. '}{label}</Checkbox>;
         })}
     </CheckboxGroup>
        
    } else if (isDropdown || mode == 'dropdown') {
        //console.log(reports);
        // if its dropdown - use select
       
        return <Select value={value} disabled={disabled} onChange={onChange} style={{width:'100%'}}>
         {options.map((option, i) => {
             const {value, label} = option;
             const prefix =  prefixAsNumber ? i+1 : answer_abc_num.nextChar((i+1));
            return <Option key={i} value={value} >{showPrefix && prefix+'. '}{label}</Option>;
        })}
        </Select>;
    } else {
       
        return <RadioGroup onChange={onChange} value={value} disabled={disabled}>
        {options.map((option, i) => {
             const {value, label} = option;
             const prefix =  prefixAsNumber ? i+1 : answer_abc_num.nextChar((i+1));
            return <Radio key={i} value={value} style={radioStyle} >{showPrefix && prefix+'. '}{label}</Radio>;
        })}
        </RadioGroup>
    }
} 

export default ChoiceElement;


export const RadioFormField = props => {
    return <ChoiceElement {...props} />
}