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
    console.log(props, 'assessmentprops');
    const {form, formItemLayout=formItemLayoutDefault, date, assignObject} = props;
    const {getFieldDecorator, getFieldValue} = form;
    // if we pass additional props
    const {object,cohort} = assignObject || {};
    //const {id:assessmentId} = object || {};
    return <React.Fragment>

        <FormItem
            {...formItemLayout}
            label="Select Assessment"
        >
            {getFieldDecorator('assessment', {
                initialValue:object,
                rules: [{ required: true, message: 'Please Select Assessment' }],
            })(
                <AssessmentSelect getFullInfo cohort={cohort} disabled />
                )}
        </FormItem>

        
        {getFieldValue('assessment') && <AssessmentSchedule assessment={getFieldValue('assessment')} endDate={date} form={form} formItemLayout={formItemLayout} />}
        {/* {plan && <PlanSchedule  />} */}
        </React.Fragment>
}

export default TaskManagerAttachmentSelectAssessment;