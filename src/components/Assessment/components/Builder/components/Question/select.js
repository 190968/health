import React from 'react';
import { SelectFromList } from '../../../../../UI/SelectFromList';
import { compose, withProps } from 'recompose';
import { withDrawer } from '../../../../../Modal';

const items = [
    {'id': 'list', label: 'Multiple Choice'},
    {'id': 'input', label: 'Open Ended'},
    {'id': 'time', label: 'Time'},
    {'id': 'dropdown', label: 'Dropdown'},
    // {'id': 'yes_no', label: 'Yes/No'},
    {'id': 'range', label: 'Range'},
    // {'id': 'question', label: 'Existing Question'},
];
const AssessmentQuestionSelect = props => {

    return <SelectFromList items={items} onSelect={props.setType}/>
}

const enhace = compose(
    withProps(props => {
        return {modalTitle: 'Select Question to add'}
    }),
    withDrawer
)
export default enhace(AssessmentQuestionSelect);
