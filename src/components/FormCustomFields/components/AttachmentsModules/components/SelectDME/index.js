import React from 'react';
import { Form} from 'antd';
import { DMEManagerFormFields } from '../../../../../DME/components/Manager';

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
export const TaskManagerAttachmentSelectDME = props => {
    const {form, formItemLayout=formItemLayoutDefault, date, assignObject, attachment, managerProps} = props;
    const {getFieldDecorator, getFieldValue} = form;
    // if we pass additional props
    const {id, object:objectInit} = assignObject || {};
    const {object=objectInit} = attachment || {};
    return <React.Fragment>
            <DMEManagerFormFields form={form} date={date} formItemLayout={formItemLayout} DME={object} managerProps={managerProps} />
        </React.Fragment>
}

export default TaskManagerAttachmentSelectDME;