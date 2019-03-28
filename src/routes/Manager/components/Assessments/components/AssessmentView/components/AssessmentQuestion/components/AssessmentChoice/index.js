import React from 'react'

import {Checkbox, Radio, Select, Icon, Tooltip} from 'antd';
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
    // console.log(i,'ABC');
	return String.fromCharCode(this.charCodeAt(0) - n);
}

export const AssessmentAnswerChoice = props => {
    const {answers, value, numberAsPrefix=false, isMultiple=false, reports:reportsInit=[], isDropdown, disabled=false, onChange, showCorrect=false} = props;
    // const {value} = props;
    //  console.log(props, 'VALUEVALUE');
    // console.log(reports, 'reports');
    const reports = reportsInit.map(r=>r.answerId);
    
    var answer_abc_num = 'a';
    if (isMultiple) {
         // if it's multiple, check use checkboxes
         return <CheckboxGroup value={value} onChange={onChange} disabled={disabled} >
         {answers.map((option, i) => {
             const {id, label, isCritical, isValidAnswer} = option;
            //  console.log(i);
             const prefix = numberAsPrefix ? (i+1) : answer_abc_num.nextChar((i));

             const hasReported = Array.isArray(reports) && reports.includes(id);
             let correctIcon = (showCorrect && isValidAnswer && hasReported) && <Tooltip title={'Correct'} ><Icon type="check-circle" style={{color:'green', verticalAlign:'middle'}} /></Tooltip>
                //  console.log(prefix, prefix);
             return <Checkbox key={id} value={id} style={vertStyle} >{prefix}. {label} {correctIcon}</Checkbox>;
         })}
     </CheckboxGroup>
        
    } else if (isDropdown) {
        //console.log(reports);
        // if its dropdown - use select
       
        return <Select value={value} disabled={disabled} onChange={onChange} style={{width:'100%'}}>
        {answers.map((option, i) => {
            const {id, label, isCritical, isValidAnswer} = option;
            const prefix = numberAsPrefix ? (i+1) : answer_abc_num.nextChar((i));
            const hasReported = value && value === id;
            let correctIcon = (showCorrect && isValidAnswer && hasReported) && <Tooltip title={'Correct'} ><Icon type="check-circle" style={{color:'green', verticalAlign:'middle'}} /></Tooltip>

            return <Option key={id} value={id} >{prefix}. {label} {correctIcon}</Option>;
        })}
        </Select>;
    } else {
        // otherwise use radios
        //let radioStyle = {};
        // if ( isVertical) {
        //     radioStyle = vertStyle;
        // }
    //    console.log(value, 'valuevaluevalue');
        return <RadioGroup onChange={onChange} value={value} disabled={disabled}>
        {answers.map((option, i) => {
            const {id, idForReported, label, isCritical, isValidAnswer} = option;
            const prefix = numberAsPrefix ? (i+1) : answer_abc_num.nextChar((i));

            const hasReported = value && value === id;
            let correctIcon = (showCorrect && isValidAnswer && hasReported) && <Tooltip title={'Correct'} ><Icon type="check-circle" style={{color:'green', verticalAlign:'middle'}} /></Tooltip>

            // return <Radio key={id} value={idForReported} style={radioStyle} >{prefix}. {label}</Radio>;
            return <Radio key={id} value={id} style={radioStyle} >{prefix}. {label} {correctIcon}</Radio>;
        })}
        </RadioGroup>
    }
} 

export default AssessmentAnswerChoice;