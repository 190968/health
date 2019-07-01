import React from 'react';
import { Form } from 'antd';
import { TaskManagerAttachmentTrackerSetup } from './containers/TrackerSetup';
import TrackerSelect from '../../../../../Autosuggest/containers/TrackerSelect';

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
export const TaskManagerAttachmentSelectTracker = props => {
    const {form, formItemLayout=formItemLayoutDefault, date, assignObject, attachment, patient} = props;
    const {getFieldDecorator, getFieldValue} = form;
    // if we pass additional props
    const {object:objectInit} = assignObject || {};
    const {id, object=objectInit} = attachment || {};
    const {measurement} = object || {}; 
    //const {id:assessmentId} = object || {};
    return <React.Fragment>

        <FormItem
            {...formItemLayout}
            label="Select Tracker"
        >
            {getFieldDecorator('measurement', {
                initialValue: measurement,
                rules: [{ required: true, message: 'Please Select Tracker' }],
            })(
                <TrackerSelect getFullInfo user={patient} />
                )}
        </FormItem>

        
        {getFieldValue('measurement') && <TaskManagerAttachmentTrackerSetup tracker={object} measurement={getFieldValue('measurement')} endDate={date} form={form} formItemLayout={formItemLayout} />}
        {/* {plan && <PlanSchedule  />} */}
        </React.Fragment>
}

export default TaskManagerAttachmentSelectTracker;