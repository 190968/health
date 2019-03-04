import React from 'react';
import { Icon, Popconfirm } from 'antd';
import { withDeleteAssessmentQuestionMutation } from '../../../../../mutations';

const AssessmentQuestionDeleteButtonPure = props => {
    return <Popconfirm title={"Delete?"} onConfirm={props.deleteAssessmentQuestion} okText="Yes" cancelText="No">
    {props.asMenuItem ? <a>Delete</a> : <Icon type="close-circle" theme="outlined" />}
</Popconfirm>
}


// const AssessmentSectionManagerButtonPure = props => {
//     const {showModal, deleteAssessmentSection, asButton=true, ...otherProps} = props;
//     // console.log(userAssessment);
//     return <React.Fragment>
//         <Icon type={'delete'} onClick={deleteAssessmentSection} />
//     </React.Fragment>
// }

export const AssessmentQuestionDeleteButton = withDeleteAssessmentQuestionMutation(AssessmentQuestionDeleteButtonPure);