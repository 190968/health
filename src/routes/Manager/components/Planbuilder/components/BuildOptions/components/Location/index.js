import React from 'react';
import {Card, Button, Form, Select } from 'antd';
import AddressField from '../../../../../../../../components/FormCustomFields/components/Address';
const FormItem = Form.Item;
 
 

const PlanbuilderOptionsLocation = props => {
    const {form, plan } = props;
    const { getFieldDecorator } = form;
    const {planDetails} = plan || {};
    const {location} = planDetails || {};
    return <Card title={'Language'} actions={[<Button type={'primary'} onClick={props.onSubmit}>Save</Button>]}>
    <Form onSubmit={props.onSubmit}>
                <FormItem
                    // {...tailFormItemLayout}
                    help={'Add a location to this Plan'}
                >
                    {getFieldDecorator('address', {
                        initialValue: location,
                        rules: [{ required: true, message:"Input title Please" , whitespace: true }],
                    })(
                        <AddressField noStreet />
                    )}
                </FormItem>
            </Form>
    </Card>;
}

export default PlanbuilderOptionsLocation;