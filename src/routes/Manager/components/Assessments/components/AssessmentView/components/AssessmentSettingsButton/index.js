import React from 'react';
import {Icon} from 'antd';
import AssessmentSettings  from '../AssessmentSettings';
import SettingsDropdown from '../../../../../../../../components/UI/SettingsDropdown';
import { UserAssessmentDeleteButton } from '../../../Buttons/containers/Delete';
import { AssessmentHistoryButton } from '../../../Buttons/components/History';
const AssessmentSettingsButton = props => {
    const {showModal, toggleModal, userAssessment, asButton=true, ...otherProps} = props;
    const {canReport} = userAssessment;
    const items = [];

    items.push({key:'history', content: <AssessmentHistoryButton  userAssessment={userAssessment} asMenuItem {...otherProps} />});
    
    if (canReport) {
        items.push({key:'delete', content: <UserAssessmentDeleteButton userAssessment={userAssessment} {...otherProps} refetch={props.onHide} asMenuItem />});
    }
    return <SettingsDropdown items={items} />

    // return <React.Fragment>
    //     {showModal && <AssessmentSettings userAssessment={userAssessment} {...otherProps} asModal onHide={toggleModal} />}
    //     <span onClick={toggleModal}><Icon type="setting" theme="outlined" /></span>
    // </React.Fragment>
}

export default AssessmentSettingsButton;