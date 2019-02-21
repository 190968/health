import React from 'react';
import {Table, Button} from 'antd';
import { AssessementView } from '../../containers/AssessmentView';
const AssessmentViewButton = props => {
    const {showModal, toggleModal, userAssessment, label=false, asButton=true, ...otherProps} = props;
    const title = label || userAssessment.assessment.name;
    return <React.Fragment>
        {showModal && <AssessementView userAssessment={userAssessment} {...otherProps} onHide={toggleModal} />}
        <span onClick={toggleModal}>{title}</span>
    </React.Fragment>
}

export default AssessmentViewButton;