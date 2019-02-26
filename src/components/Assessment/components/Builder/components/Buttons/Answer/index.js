import React from 'react';
import {Table, Button, Icon} from 'antd';
import { withToggleModal } from '../../../../../../Modal';
import { AssessmentQuestionAnswerManager } from '../../Question/containers/Answer';

const AssessmentQuestionAnswerManagerButtonPure = props => {
    const {showModal, toggleModal, asButton=true, ...otherProps} = props;
    const {answer} = props;
    // console.log(userAssessment);
    return <React.Fragment>
        {showModal && <AssessmentQuestionAnswerManager {...otherProps} asModal onHide={toggleModal} />}
        {answer ? <Icon type={'edit'} onClick={toggleModal} /> : <Button type={'dashed'} onClick={toggleModal}>Add Answer</Button>}
    
    </React.Fragment>
}

export const AssessmentQuestionAnswerManagerButton = withToggleModal(AssessmentQuestionAnswerManagerButtonPure);