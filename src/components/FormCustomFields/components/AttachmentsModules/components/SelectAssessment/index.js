import React from 'react';
import { Form, Button } from 'antd';
import AssessmentSelect from '../../../../../Autosuggest/containers/AssessmentSelect';
import {AssessmentSchedule} from '../../../../../Assessment/containers/Schedule';
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
export const TaskManagerAttachmentSelectAssessment = props => {
    const {form, formItemLayout=formItemLayoutDefault, date, assignObject, attachment} = props;
    const {getFieldDecorator, getFieldValue} = form;
    // if we pass additional props
    const {cohort} = assignObject || {};
    const {id, object} = attachment || {};
    const {schedule} = object || {};
    return <React.Fragment>

        <FormItem
            {...formItemLayout}
            label="Select Assessment"
        >
            {getFieldDecorator('assessment', {
                initialValue: object,
                rules: [{ required: true, message: 'Please Select Assessment' }],
            })(
                <AssessmentSelect getFullInfo cohort={cohort} />
                )}
        </FormItem>

        
        {getFieldValue('assessment') && <AssessmentSchedule schedule={schedule} assessment={getFieldValue('assessment')} endDate={date} form={form} formItemLayout={formItemLayout} />}
        {/* {plan && <PlanSchedule  />} */}
        </React.Fragment>
}

export default TaskManagerAttachmentSelectAssessment;