import React from 'react';
import { Card, Button, Form, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


const ribbons = [
    { id: 1, label: 'Tracker' },
    { id: 2, label: 'Staff Picks' },
    { id: 3, label: 'New' },
    { id: 4, label: 'Lessons Only' },
    { id: 5, label: 'Recipe' },
    { id: 6, label: 'Family Fun' },
    { id: 8, label: 'Class' }
]
const PlanbuilderOptionsRibbons = props => {
    const { form, plan } = props;
    const { getFieldDecorator } = form;
    const { planDetails } = plan || {};
    const { ribbon } = planDetails || {};
    const { id:ribbonId } = ribbon || {};
    return <Card title={'Ribbons'} actions={[<Button type={'primary'} onClick={props.onSubmit}>Save</Button>]}>
    <Form onSubmit={props.onSubmit}>
            <FormItem
                // {...tailFormItemLayout}
                help={'Select a ribbon to show on the plan cover in the plan store'}
            >
                {getFieldDecorator('ribbonId', {
                    initialValue: ribbonId
                    // rules: [{ required: true, message:"Input title Please" , whitespace: true }],
                })(
                    <Select >
                        {ribbons.map(ribbon => <Option key={ribbon.id} value={ribbon.id}>{ribbon.label}</Option>)}
                    </Select>
                )}
            </FormItem>
        </Form>
    </Card>;
}

export default PlanbuilderOptionsRibbons;