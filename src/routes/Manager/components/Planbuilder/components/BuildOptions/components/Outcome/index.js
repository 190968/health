import React from 'react';
import {Card, Button, Form, Input } from 'antd';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
 
const PlanbuilderOptionsOutcome = props => {
    const {form , plan} = props;
    const { getFieldDecorator } = form;
    const {planDetails} = plan || {};
    const {outcome} = planDetails || {};
    return <Card title={'Outcome'} actions={[<Button type={'primary'} onClick={props.onSubmit}>Save</Button>]}>
    <Form onSubmit={props.onSubmit}>
                <FormItem
                    // {...tailFormItemLayout}
                    help={'What is the overall outcome of this plan'}
                >
                    {getFieldDecorator('outcome', {
                        initialValue:outcome
                        // rules: [{ required: true, message:"Input title Please" , whitespace: true }],
                    })(
                        <TextArea autosize={{ minRows: 2, maxRows: 6 }}  />
                    )}
                </FormItem>
            </Form>
    </Card>;
}

export default PlanbuilderOptionsOutcome;