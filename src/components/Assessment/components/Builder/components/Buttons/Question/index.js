import React from 'react';
import {Table, Button, Icon} from 'antd';
import { AssessmentQuestionManager } from '../../../containers/Question';
import { withToggleModal } from '../../../../../../Modal';

const AssessmentQuestionManagerButtonPure = props => {
    const {showModal, toggleModal, asButton=true, ...otherProps} = props;
    const {question} = props;
    // console.log(userAssessment);
    return <React.Fragment>
        {showModal && <AssessmentQuestionManager  {...otherProps}  onHide={toggleModal} />}
        {question ? <Icon type={'edit'} onClick={toggleModal} /> : <Button type={'primary'} onClick={toggleModal}>Add Question</Button>}
    
    </React.Fragment>
}

export const AssessmentQuestionManagerButton = withToggleModal(AssessmentQuestionManagerButtonPure);