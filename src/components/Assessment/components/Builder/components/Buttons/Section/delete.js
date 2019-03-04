import React from 'react';
import { Popconfirm, Icon} from 'antd';
import { AssessmentSectionManager } from '../../../containers/Section';
import { withToggleModal } from '../../../../../../Modal';
import { withDeleteAssessmentSectionMutation } from '../../../../../mutations';



const AssessmentSectionDeleteButtonPure = props => {
    return <Popconfirm title={"Delete?"} onConfirm={props.deleteAssessmentSection} okText="Yes" cancelText="No">
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

export const AssessmentSectionDeleteButton = withDeleteAssessmentSectionMutation(AssessmentSectionDeleteButtonPure);