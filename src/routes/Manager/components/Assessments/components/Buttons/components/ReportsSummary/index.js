import React from 'react';
import {Table, Button} from 'antd';
import { AssessmentHistory } from '../../../../containers/History';
import { withToggleModal } from '../../../../../../../../components/Modal';
import { AssessmentReportsSummary } from '../../../../../../../../components/Assessment/containers/ReportsSummary';

const AssessmentReportsSummaryButtonPure = props => {
    const {showModal, toggleModal, label, assessment, asButton=true, ...otherProps} = props;
    // console.log(userAssessment);
    return <React.Fragment>
        {showModal && <AssessmentReportsSummary assessment={assessment} {...otherProps} onHide={toggleModal} />}
        <a onClick={toggleModal}>{label || 'Reports'}</a>
    </React.Fragment>
}

export const AssessmentReportsSummaryButton = withToggleModal(AssessmentReportsSummaryButtonPure);
export default AssessmentReportsSummaryButton;