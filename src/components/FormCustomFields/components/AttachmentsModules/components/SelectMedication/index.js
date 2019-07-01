import React from 'react';
import { Form } from 'antd';
import MedicationSelect from '../../../../../Autosuggest/containers/MedicationSelect';
import { TaskManagerAttachmentMedicationSetup } from './containers/MedicationSetup';
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
export const TaskManagerAttachmentSelectMedication = props => {
    const {form, formItemLayout=formItemLayoutDefault, date, assignObject, attachment, patient} = props;
    const {getFieldDecorator, getFieldValue} = form;
    // if we pass additional props
    const {object:objectInit} = assignObject || {};
    const {id, object=objectInit} = attachment || {};
    const {drug} = object || {};
    //const {id:assessmentId} = object || {};
    return <React.Fragment>

        <FormItem
            {...formItemLayout}
            label="Select Medication"
        >
            {getFieldDecorator('drug', {
                initialValue: drug,
                rules: [{ required: true, message: 'Please Select Medication' }],
            })(
                <MedicationSelect getFullInfo user={patient} />
            )}
        </FormItem>

        
        {getFieldValue('drug') && <TaskManagerAttachmentMedicationSetup medication={object} drug={getFieldValue('drug')} endDate={date} form={form} formItemLayout={formItemLayout} />}
        {/* {plan && <PlanSchedule  />} */}
        </React.Fragment>
}

export default TaskManagerAttachmentSelectMedication;