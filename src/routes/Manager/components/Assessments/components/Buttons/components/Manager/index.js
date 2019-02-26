import React from 'react';
import {Table, Button} from 'antd';
import { withToggleModal } from '../../../../../../../../components/Modal';
import { AssessementManager } from '../../../../containers/AssessmentManager';

const AssessmentManagerButtonPure = props => {
    const {showModal, toggleModal, asButton=true, ...otherProps} = props;
    // console.log(userAssessment);
    return <React.Fragment>
        {showModal && <AssessementManager  {...otherProps}  onHide={toggleModal} />}
        <span onClick={toggleModal}>Edit</span>
    </React.Fragment>
}

export const AssessmentManagerButton = withToggleModal(AssessmentManagerButtonPure);