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
    //height: '30px',
    //lineHeight: '30px',
  };

String.prototype.nextChar = function(i) {
	const n = i || 0;
	return String.fromCharCode(this.charCodeAt(0) + n);
}

String.prototype.prevChar = function(i) {
	const n = i || 1;
	return String.fromCharCode(this.charCodeAt(0) - n);
}

export const AssessmentAnswerChoice = props => {
    const {answers, value,  isMultiple=false, reports, isDropdown, disabled=false, onChange} = props;
    //const {value} = this.state;
    console.log(value, 'VALUE');
    var answer_abc_num = 'a';
    if (isMultiple) {

        
         // if it's multiple, check use checkboxes
         return <CheckboxGroup value={value} onChange={onChange} disabled={disabled} >
         {answers.map((option, i) => {
             const {id, label, isCritical, isValidAnswer} = option;
             const prefix = answer_abc_num.nextChar((i+1));
             return <Checkbox key={id} value={id} style={vertStyle} >{prefix}. {label}</Checkbox>;
         })}
     </CheckboxGroup>
        
    } else if (isDropdown) {
        //console.log(reports);
        // if its dropdown - use select
       
        return <Select value={value} disabled={disabled} onChange={onChange} style={{width:'100%'}}>
        {answers.map((option, i) => {
            const {id, label, isCritical, isValidAnswer} = option;
            const prefix = answer_abc_num.nextChar((i+1));
            return <Option key={id} value={id} >{prefix}. {label}</Option>;
        })}
        </Select>;
    } else {
        // otherwise use radios
        //let radioStyle = {};
        // if ( isVertical) {
        //     radioStyle = vertStyle;
        // }
       
        return <RadioGroup onChange={onChange} value={value} disabled={disabled}>
        {answers.map((option, i) => {
            const {id, idForReported, label, isCritical, isValidAnswer} = option;
            const prefix = answer_abc_num.nextChar((i+1));
            // return <Radio key={id} value={idForReported} style={radioStyle} >{prefix}. {label}</Radio>;
            return <Radio key={id} value={id} style={radioStyle} >{prefix}. {label}</Radio>;
        })}
        </RadioGroup>
    }
} 

export default AssessmentAnswerChoice;