import React from 'react';
import {Table, Button} from 'antd';
import { AssessmentHistory } from '../../../../containers/History';
import { withToggleModal } from '../../../../../../../../components/Modal';

const AssessmentHistoryButtonPure = props => {
    const {showModal, toggleModal, userAssessment, asButton=true, ...otherProps} = props;
    // console.log(userAssessment);
    return <React.Fragment>
        {showModal && <AssessmentHistory userAssessment={userAssessment} {...otherProps} asModal onHide={toggleModal} />}
        <span onClick={toggleModal}>View History</span>
    </React.Fragment>
}

export const AssessmentHistoryButton = withToggleModal(AssessmentHistoryButtonPure);
export default AssessmentHistoryButton;