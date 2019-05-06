import React from 'react';
import {Card, Button, Form, Input } from 'antd';
import { ActionPlanSelect } from '../../../../../../../../components/Autosuggest/containers/PlanSelect';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
 
const PlanbuilderOptionsAdvanced = props => {
    const {form, plan } = props;
    const { getFieldDecorator } = form;
    const {planDetails} = plan || {};
    const {source, audience, associatedPlans, requirements, levels} = planDetails || {};
    console.log(associatedPlans, 'associatedPlans');
    return <Card title={'Advanced'} actions={[<Button type={'primary'} onClick={props.onSubmit}>Save</Button>]}>
    <Form onSubmit={props.onSubmit}>
                <FormItem
                    {...formItemLayout}
                    label={'Source'}
                    help={'List any sources you used for content for this plan'}
                >
                    {getFieldDecorator('source', {
                        initialValue: source
                    })(
                        <TextArea autosize={{ minRows: 2, maxRows: 6 }}  />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={'Associated Plans'}
                    help={'Select ActionPlan IDs that are associated with this ActionPlan (separate with commas)'}
                >
                    {getFieldDecorator('associatedPlans', {
                        initialValue: associatedPlans
                    })(
                        <ActionPlanSelect mode={'multiple'} getFullInfo />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={'Audience'}
                    help={'What is the perfect audience for this plan?'}
                >
                    {getFieldDecorator('audience', {
                        initialValue: audience
                    })(
                        <TextArea autosize={{ minRows: 2, maxRows: 6 }}  />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={'Requirements'}
                    help={'List any requirements the user may need to complete this plan'}
                >
                    {getFieldDecorator('requirements', {
                        initialValue: requirements
                    })(
                        <TextArea autosize={{ minRows: 2, maxRows: 6 }}  />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={'Level'}
                    help={'List any requirements the user may need to complete this plan'}
                >
                    {getFieldDecorator('levels', {
                        initialValue: levels
                    })(
                        <TextArea autosize={{ minRows: 2, maxRows: 6 }}  />
                    )}
                </FormItem>
            </Form>
    </Card>;
}

export default PlanbuilderOptionsAdvanced;