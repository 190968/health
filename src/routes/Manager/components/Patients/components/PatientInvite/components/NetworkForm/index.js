import React from 'react';
import { Tabs } from 'antd';
import {withState} from 'recompose';
import FormSection from './containers/FormSection';
const TabPane = Tabs.TabPane;

const NetworkForm = props => {
    const { getProfileForm=[], ...otherProps } = props;
    console.log(props, 'Form Props');
    return <Tabs defaultActiveKey="0">
        {getProfileForm.map((section, i) => {
            return <TabPane tab={section.label} key={i}>
                    <FormSection section={section} {...otherProps} />
                </TabPane>
        })}
    </Tabs>;
}

export default withState('patient', 'setPatient', props => props.patient)(NetworkForm);