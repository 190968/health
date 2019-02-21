import React from 'react';
import {Form, Input} from 'antd';
import { DateField } from '../../../../../../components/FormCustomFields';
import AssessmentSelect from '../../../../../../components/Autosuggest/containers/AssessmentSelect';
import CohortSelect from '../../../../../../components/Autosuggest/containers/CohortSelect';
import moment from 'moment';
import { TaskManagerAttachments } from '../../../../../../components/Tasks/containers/Attachments';
import { AttachmentsModules } from '../../../../../../components/FormCustomFields/containers/AttachmentsModules';
import { prepareTaskAttachmentFromType } from '../../../../../../components/FormCustomFields/components/AttachmentsModules';
import { prepareAttachmentsFromSimpleConnection } from '../../../../../../components/FormCustomFields/components/Attachments';

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

const ScreeningManager = props => {
    const {screening, form, formItemLayout=formItemLayoutDefault} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {title='', getCohorts=[], getAttachments=[], executeDate, canBeEdited=false} = screening || {};
    console.log(props, 'props');
    console.log(screening);
    return <Form>
        <FormItem
            {...formItemLayout}
            label="Name"
        >
            {getFieldDecorator('name', {
                initialValue: title,
                rules: [{
                    required: true,
                    message: "Please enter Chemotherapy name",
                }],
            })(
                <Input />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Cohorts"
        >
            {getFieldDecorator('cohorts', {
                initialValue: getCohorts,
                // rules: [{
                //     required: true,
                //     message: "Please enter Chemotherapy name",
                // }],
            })(
                <CohortSelect mode={'multiple'} />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Assessments"
        >
            {getFieldDecorator('attachments', {
                initialValue: prepareAttachmentsFromSimpleConnection(getAttachments),
                // rules: [{
                //     required: true,
                //     message: "Please enter Chemotherapy name",
                // }],
            })(
                <AttachmentsModules editable date={getFieldValue('executeDate')} type={'assessment'} buttonLabel={'Add Assessment'} />
                // <AssessmentSelect mode={'multiple'} />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Execute on"
        >
            {getFieldDecorator('executeDate', {
                initialValue: executeDate && moment(executeDate),
                rules: [{
                    required: true,
                    message: "Please select execution date",
                }],
            })(
                <DateField disabledDate={props.disabledDate} />
            )}
        </FormItem>
    </Form>
}

export default ScreeningManager;