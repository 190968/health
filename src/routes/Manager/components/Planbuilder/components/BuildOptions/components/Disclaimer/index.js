import React from 'react';
import {Card, Button, Form, Checkbox,  Input, Radio } from 'antd';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
 
const PlanbuilderOptionsDisclaimer = props => {
    const {form, plan } = props;
    const { getFieldDecorator, getFieldValue } = form;
    const {planDetails} = plan || {};
    const {disclaimer, consentIsRequired} = planDetails || {};

    return <Card title={'Privacy'} actions={[<Button type={'primary'} onClick={props.onSubmit}>Save</Button>]}>
    <Form onSubmit={props.onSubmit}>
                <FormItem
                        // {...tailFormItemLayout}
                        help={'Add a Disclaimer to this ActionPlan.'}
                    >
                        {getFieldDecorator('useDisclaimer', {
                            initialValue: disclaimer && disclaimer !== '',
                            valuePropName: 'checked'
                        })(
                            <Checkbox>Use Disclaimer</Checkbox>
                        )}
                </FormItem>

                {getFieldValue('useDisclaimer') && <>
                    <FormItem
                        // {...formItemLayout}
                        // label={'Visible to'}
                        className={'no-margin'}
                    >
                        {getFieldDecorator('disclaimer', {
                            initialValue:disclaimer
                            // rules: [{ required: true, message:"Enter Price" , whitespace: true }],
                        })(
                             <TextArea autosize={{ minRows: 2, maxRows: 6 }}  />
                        )}
                    </FormItem>
                    <FormItem
                        // {...tailFormItemLayout}
                    >
                        {getFieldDecorator('consentIsRequired', {
                            initialValue: consentIsRequired,
                            valuePropName: 'checked'
                        })(
                            <Checkbox>User consent is required</Checkbox>
                        )}
                </FormItem>
                </>}
            </Form>
    </Card>;
}

export default PlanbuilderOptionsDisclaimer;