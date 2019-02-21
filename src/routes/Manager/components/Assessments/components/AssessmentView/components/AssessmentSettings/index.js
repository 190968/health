import React from 'react';
import {Drawer, Switch} from 'antd';
const AssessmentSettings = props => {
    const {onHide, toggleModal, userAssessment, asButton=true, ...otherProps} = props;
    return <Drawer
        title="Assessment Settings"
        placement="right"
        width={400}
        closable={true}
        onClose={onHide}
        visible={true}
    >
        <p><Switch defaultChecked  /> Send email reminders</p>
        <p><Switch defaultChecked  /> Send push reminders</p>
    </Drawer>
}

export default AssessmentSettings;