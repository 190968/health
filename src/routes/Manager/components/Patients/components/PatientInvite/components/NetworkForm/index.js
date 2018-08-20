import React from 'react';
import { Tabs, Form } from 'antd';
import FormSection from './components/FormSection';
const TabPane = Tabs.TabPane;

const NetworkForm = props => {
    const { getProfileForm, form } = props;
    console.log(props);
    return <Form >
    <Tabs defaultActiveKey="0">
        {getProfileForm.map((section, i) => {
            return <TabPane tab={section.label} key={i}>
                    <FormSection section={section} form={form} />
                </TabPane>
        })}
    </Tabs>
    </Form>;
}

export default NetworkForm;