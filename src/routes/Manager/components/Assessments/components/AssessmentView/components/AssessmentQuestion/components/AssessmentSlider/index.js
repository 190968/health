import React from 'react';
import {  Slider } from 'antd';

const AssessmentSlider = props => {
    const {answers=[], reports, disabled, onChange} = props;

    let selectedMark = undefined;
    let marks = {};

    let value = reports.map(report => report.answerId);
    value = value[0] || null;
    
    answers.map((option, i) => {
        const coid = option.id;
        const name = option.label;

        if (value === coid) {
            selectedMark = i;
        }

        marks[i] = {label:name};
        return option;
    });
     

    return <div style={{padding:'0 20px'}}><Slider disabled={disabled} onChange={onChange} marks={marks} max={answers.length-1} defaultValue={selectedMark} /></div>;//<Slider marks={marks}    />

}

export default AssessmentSlider;


