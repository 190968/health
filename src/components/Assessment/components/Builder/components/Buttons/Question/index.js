import React from 'react';
import {Table, Button, Icon} from 'antd';
import { AssessmentQuestionManager } from '../../../containers/Question';
import { withToggleModal } from '../../../../../../Modal';
import { IconCustom } from '../../../../../../FitIcon';

const AssessmentQuestionManagerButtonPure = props => {
    const {showModal, toggleModal, icon, asButton=true, ...otherProps} = props;
    const {question} = props;
    // console.log(userAssessment);
    let iconHtml = <Icon type={'edit'} onClick={toggleModal} />;
    if (icon === 'brahms') {
        iconHtml = <IconCustom type={'brahms'} onClick={toggleModal} />
    }
    return <React.Fragment>
        {showModal && <AssessmentQuestionManager  {...otherProps}  onHide={toggleModal} />}
        {question ?  iconHtml : <Button type={'primary'} icon={'plus'} onClick={toggleModal}>Add Question</Button>}
    
    </React.Fragment>
}

export const AssessmentQuestionManagerButton = withToggleModal(AssessmentQuestionManagerButtonPure);