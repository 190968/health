import React from 'react';
import { SelectFromList } from '../../../../../UI/SelectFromList';
import { compose, withProps } from 'recompose';
import { withDrawer } from '../../../../../Modal';

const items = [
    {'id': 'list', label: 'Multiple Choice'},
    {'id': 'radio', label: 'Select One'},
    {'id': 'dropdown', label: 'Dropdown'},
    {'id': 'yes_no', label: 'Yes/No'},
    {'id': 'input', label: 'Open Ended'},
    {'id': 'number', label: 'Number'},
    {'id': 'time', label: 'Time'},
    {'id': 'range', label: 'Range'},
    {'id': 'tracker', label: 'Tracker'},
    {'id': 'question', label: 'Existing Question'},
];
const AssessmentQuestionSelect = props => {
    return <SelectFromList items={items} onSelect={props.setType}/>
}

const enhace = compose(
    withProps(props => {
        return {modalTitle: 'Select Question Type'}
    }),
    withDrawer
)
export default enhace(AssessmentQuestionSelect);
