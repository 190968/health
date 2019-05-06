import React from 'react';
import { SelectFromList } from '../../../../../UI/SelectFromList';
import { compose, withProps } from 'recompose';
import { withDrawer } from '../../../../../Modal';
import { IconCustom } from '../../../../../FitIcon';

const items = [
    {'id': 'list', label: 'Multiple Choice', icon:<IconCustom type="multiple-choice"/>},
    {'id': 'radio', label: 'Select One', icon:<IconCustom type="select-one-alt"/>},
    {'id': 'dropdown', label: 'Dropdown', icon:<IconCustom type="dropdown"/>},
    {'id': 'yes_no', label: 'Yes/No', icon:<IconCustom type="yes-no"/>},
    {'id': 'input', label: 'Open Ended', icon:<IconCustom type="open-ended"/>},
    {'id': 'number', label: 'Value', icon:<IconCustom type="number"/>},
    {'id': 'time', label: 'Time', icon:<IconCustom type="time"/>},
    {'id': 'range', label: 'Slider', icon:<IconCustom type="range"/>},
    {'id': 'tracker', label: 'Tracker', icon:<IconCustom type="tracker"/>},
    {'id': 'question', label: 'Global Question', icon:<IconCustom type="options"/>},
];

export const formatAssessmentQuestionType = type => {
    const object = items.find(i => i.id === type);
    const {label} = object || {};
    return label;
}
const AssessmentQuestionSelect = props => {
    return <SelectFromList cols={2} items={items} onSelect={props.setType}/>
}

const enhace = compose(
    withProps(props => {
        return {modalTitle: 'Select Question Type'}
    }),
    withDrawer
)
export default enhace(AssessmentQuestionSelect);
