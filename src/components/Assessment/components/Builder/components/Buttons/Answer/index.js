import React from 'react';
import {Table, Button, Icon} from 'antd';
import { withToggleModal } from '../../../../../../Modal';
import { AssessmentQuestionAnswerManager } from '../../Question/containers/Answer';
import { compose, branch, withHandlers } from 'recompose';

const AssessmentQuestionAnswerManagerButtonPure = props => {
    const {showModal, toggleModal, asButton=true, ...otherProps} = props;
    const {answer} = props;
    // console.log(userAssessment);
    return <React.Fragment>
        {showModal && <AssessmentQuestionAnswerManager {...otherProps} asModal onHide={toggleModal} />}
        {answer ? <Icon type={'edit'} onClick={toggleModal} /> : <Button type={'dashed'} icon={'plus'} block onClick={toggleModal}>Add an Answer</Button>}
    
    </React.Fragment>
}

const enhance = compose(
    branch(props => {
        const {answer} = props;
        const {id} = answer || {};
        return !id || id !== '';
    }, withHandlers({
        onChange: props => (value) => {
            const {onChange, answerIndex} = props;
            if (onChange) {
                onChange(value, answerIndex);
            }
        }
    })),
    withToggleModal
);
export const AssessmentQuestionAnswerManagerButton = enhance(AssessmentQuestionAnswerManagerButtonPure);