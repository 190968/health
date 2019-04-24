import React from 'react';
import { Tabs } from 'antd';
import FormSection from './containers/FormSection';
const TabPane = Tabs.TabPane;

const PatientManager = props => {
    const { getProfileForm=[], ...otherProps } = props;
    const {patient, activeStep} = props;
    // console.log(props, 'Form Props');
    const activeKey = activeStep || getProfileForm[0].id;
    // console.log(activeStep);
    // console.log(activeKey);
    return <Tabs activeKey={activeKey} onChange={props.setActiveStep}>
        {getProfileForm.map((section, i) => {
            const isLastSection = getProfileForm.length-1 === i;
            const disabled = !patient && i > 0;
            return <TabPane tab={section.label} key={section.id} disabled={disabled}>
                    <FormSection section={section} isLastSection={isLastSection} sections={getProfileForm} {...otherProps} />
                </TabPane>
        })}
    </Tabs>;
}

export default PatientManager;