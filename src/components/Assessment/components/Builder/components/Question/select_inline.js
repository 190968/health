import React from 'react';
import {Affix, Tooltip} from 'antd';
import { SelectFromList } from '../../../../../UI/SelectFromList';
import { compose, withProps } from 'recompose';
import { withDrawer } from '../../../../../Modal';
import { IconCustom } from '../../../../../FitIcon';
import  '../../../../../Plan/components/Builder/components/SelectElementType/index.less';
// import { AssessmentQuestionManager } from '../../containers/Question';
import { AssessmentQuestionManagerButton } from '../Buttons/Question';
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


export const AssesmentQuestionElementSelect = props => {
    const {currentInOrder, assessment, section, increaseCurrentQuestion} = props;
    //<IconCustom type="tracker"/>
    const order = currentInOrder >= 0 ? currentInOrder+1 : 0;
    // const items = getPlanElementsList(mode);
    return <Affix><div className={'select-inline'} style={{paddingTop: 13}}>
        {items.map((item, i2) => {
            return <span className={'select-inline-item'}  key={i2}>
            <AssessmentQuestionManagerButton  assessment={assessment} section={section} type={item.id} order={order} label={<Tooltip title={item.label} placement={'bottom'}><span>{item.icon}</span></Tooltip>} increaseCurrentQuestion={increaseCurrentQuestion} />
        {/* <PlanElementManagerButton {...props} type={item.type} element={null} order={order} asButton={false} label={<Tooltip title={item.label} placement={'bottom'}><span>{item.icon}</span></Tooltip>} /> */}
        {/* {item.icon} */}
        </span>
        })}
    </div></Affix>;
}
