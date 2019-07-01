import React from 'react';
import ActionPlanSelect from '../../../../../Autosuggest/containers/PlanSelect';
import { Form, Button } from 'antd';
import {PlanSchedule} from '../../../../../../routes/Plan/containers/Schedule';

const FormItem = Form.Item;
const formItemLayoutDefault = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 6},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

export const TaskManagerAttachmentSelectAp = props => {
    const {onContinue, form, formItemLayout=formItemLayoutDefault, date, attachment, assignObject} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {id, object, type} = attachment || {};
    const {schedule} = object || {};
    const {plan=object} = assignObject || {};
    // console.log(props, 'aaaaaaa');
    return <React.Fragment>

        <FormItem
            {...formItemLayout}
            label="Select ActionPlan"
        >
            {getFieldDecorator('plan', {
                initialValue: plan
            })(
                <ActionPlanSelect /*onChange={onChange}*/ getFullInfo />
                )}
        </FormItem>

        
        {getFieldValue('plan') && <PlanSchedule plan={getFieldValue('plan')} schedule={schedule} endDate={date} form={form} formItemLayout={formItemLayout} />}
        {/* {plan && <PlanSchedule  />} */}
        </React.Fragment>
}

export default TaskManagerAttachmentSelectAp;