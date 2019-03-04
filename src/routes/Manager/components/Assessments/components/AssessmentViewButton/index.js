import React from 'react';
import {Table, Button} from 'antd';
import {Link} from 'react-router-dom';
import { AssessementView } from '../../containers/AssessmentView';
const AssessmentViewButton = props => {
    const {asLink, showModal, toggleModal, userAssessment, label=false, asButton=true, ...otherProps} = props;
    const title = label || userAssessment.assessment.name;
   
    if (asLink) {
        const {id} = userAssessment || {};
        return <Link to={'/assessment/'+id}>{title}</Link>;
    }
    return <React.Fragment>
        {showModal && <AssessementView userAssessment={userAssessment} {...otherProps} onHide={toggleModal} />}
        <span onClick={toggleModal}>{title}</span>
    </React.Fragment>
}

export default AssessmentViewButton;