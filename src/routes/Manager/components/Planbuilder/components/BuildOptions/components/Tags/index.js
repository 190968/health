import React from 'react';
import { Card, Button, Form, Select } from 'antd';
const FormItem = Form.Item;

const PlanbuilderOptionsTags = props => {
    const { form, plan } = props;
    const { getFieldDecorator } = form;
    const { planDetails } = plan || {};
    const { tags } = planDetails || {};
    return <Card title={'Tags'} actions={[<Button type={'primary'} onClick={props.onSubmit}>Save</Button>]}>
        <Form onSubmit={props.onSubmit}>
            <FormItem
                // {...tailFormItemLayout}
                help={'Keywords, that describes this plan'}
            >
                {getFieldDecorator('tags', {
                    initialValue: tags
                    // rules: [{ required: true, message:"Input title Please" , whitespace: true }],
                })(
                    <Select mode="tags" />
                )}
            </FormItem>
        </Form>
    </Card>;
}

export default PlanbuilderOptionsTags;