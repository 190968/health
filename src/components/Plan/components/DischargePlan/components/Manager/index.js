import React from 'react';
import { Form, Button } from 'antd';
import { AttachmentsModules } from '../../../../../FormCustomFields/containers/AttachmentsModules';
import LocationSearchInput from '../../../../../FormCustomFields/components/LocationSearchInput';
import { DrawerFooter } from '../../../../../Modal';
import { prepareTaskAttachmentFromType } from '../../../../../FormCustomFields/components/AttachmentsModules';

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

const DischargePlanManager = props => {
    const {form, formItemLayout=formItemLayoutDefault, dischargePlan, user} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {getAttachments=[], patient=user} = dischargePlan || {};
    const {firstName} = patient || {};
    // if we pass additional props
    //const {id:assessmentId} = object || {};
    return <div>
        <FormItem
        // {...formItemLayout}
        // label={<FormattedMessage {...messages.attachments} />}
        >
        {getFieldDecorator('attachments', {
            initialValue: getAttachments
        })(
            <AttachmentsModules template={'discharge'} buttonLabel={'Add Element'} attachmentLabel={'Element'} emptyMessage={'To begin adding elements to the Discharge Plan, click the button below'} noEmptyImage patient={patient} /*  date={getFieldValue('endDate')} /*task={task}*/ />
        )}
                    
        </FormItem>

        <DrawerFooter>
            <Button type={'primary'} onClick={props.onSaveDraft}>Save as Draft</Button> <Button type={'primary'} onClick={props.onAssign}>Assign To {firstName}</Button>
        </DrawerFooter>
    </div>
}

export default DischargePlanManager;