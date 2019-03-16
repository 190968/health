import React from 'react';
import {Input} from 'antd';
import { compose,withStateHandlers, branch, renderComponent } from 'recompose';
import { SelectAssessmentQuestion } from '../../../../../../../Assessment/components/Builder/containers/SelectAssessmentQuestion';
const TextArea = Input.TextArea;

const BrahmsRuleActionGoToPure = props => {
    const {value, assessment, onChange} = props;
    console.log(props, 'props');
    console.log(assessment, 'assessmentassessmentassessmentassessment');
    return <SelectAssessmentQuestion assessment={assessment} value={value} onChange={onChange} />
    //return <TextArea autosize={{ minRows: 2, maxRows: 6 }} value={value} onChange={onChange} />
}


const enhance = compose(
    withStateHandlers( props => {
        const {value, assessment} = props;
        const {goToElementId} = value || {};
        const {getSections=[]} = assessment || {};
       
        let values = [];
        if (assessment && value) {
       
            const section = getSections.find(s => {
                const {getQuestions=[]} = s;
                const question = getQuestions.find(s => s.id == goToElementId);
                if (question) {
                    return true;
                }
                return false;
            });
            console.log(goToElementId, 'goToElementIdgoToElementId');
            console.log(value);
            console.log(section);
            console.log(getSections);
            values.push(section.id);
            values.push(goToElementId);
        }
        // console.log(section, 'section');
        // goToElementId
        return {value:values};
    }, {
        onChange: (state, props) => (value, selectedOptions) => {
            // const value = e.target.value;
            // const input = prepareBrahmsGoToAction(value);
            const goToElementId = value[value.length-1] || null;
            console.log(value);
            console.log(goToElementId, 'goToElementId');
            // console.log(selectedOptions);
            props.onChange({goToElementId});
            return {
                value
            }
        }
    }),
     branch(props => props.GoToComponent, renderComponent(({GoToComponent, ...otherProps}) => {
        //  console.log(otherProps, 'otherProps');
         return <GoToComponent {...otherProps} />;
     }))
);
export const BrahmsRuleActionGoTo = enhance(BrahmsRuleActionGoToPure);


const prepareBrahmsGoToAction = value => {
    return {goToElementId:value};
}
