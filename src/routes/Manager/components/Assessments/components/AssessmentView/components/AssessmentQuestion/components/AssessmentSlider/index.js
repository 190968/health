import React from 'react';
import {  Slider, Icon, Tooltip } from 'antd';

const AssessmentSlider = props => {
    const {answers=[], value, reports, disabled, onChange, showCorrect=false} = props;

    let selectedMark = undefined;
    let marks = {};

    // let value = reports.map(report => report.answerId);
    // value = value[0] || null;
    
    answers.map((option, i) => {
        const {id, label, isValidAnswer} = option;
        const coid = id;
        const name = label;
        const hasReported = value === coid;//Array.isArray(value) && value.includes(id);
        
        if (hasReported) {
            selectedMark = i;
        }
        let correctIcon = (showCorrect && isValidAnswer && hasReported) && <Tooltip title={'Correct'} ><Icon type="check-circle" style={{color:'green', verticalAlign:'middle'}} /></Tooltip>
        
        marks[i] = {label:<>{name} {correctIcon}</>};
        return option;
    });
     

    return <div style={{padding:'0 20px'}}><Slider disabled={disabled} onChange={onChange} marks={marks} max={answers.length-1} defaultValue={selectedMark} /></div>;//<Slider marks={marks}    />

}

export default AssessmentSlider;


