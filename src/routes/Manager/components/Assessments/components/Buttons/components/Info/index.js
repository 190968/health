import React from 'react';
import {Link} from 'react-router-dom';
import {Table, Button} from 'antd';
import { withToggleModal } from '../../../../../../../../components/Modal';
import AssessementHeader from '../../../AssessmentView/components/AssessmentHeader';
// import { AssessementManager } from '../../../../containers/AssessmentManager';

const AssessmentUserInfoButtonPure = props => {
    const {showModal, toggleModal, label, asButton=true, ...otherProps} = props;
    // console.log(userAssessment);
    const {userAssessment} = props;
    return <React.Fragment>
        {showModal && <AssessementHeader  {...otherProps}  onHide={toggleModal} />}
        {userAssessment ? <span  onClick={toggleModal}>{label ? label : 'Info'}</span> : <Button onClick={toggleModal} type={'primary'} icon={'info'} />}
    </React.Fragment>
}

export const AssessmentUserInfoButton = withToggleModal(AssessmentUserInfoButtonPure);