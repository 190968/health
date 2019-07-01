import React from 'react';
import { Form, Button } from 'antd';
import { AttachmentsModules } from '../../../../../FormCustomFields/containers/AttachmentsModules';
import ProviderSelect from '../../../../../Autosuggest/containers/ProviderSelect';
import { DiagnosisSelect } from '../../../../../Autosuggest/containers/DiagnosisSelect';
// import { DrawerFooter } from '../../../../../Modal';
// import { prepareTaskAttachmentFromType } from '../../../../../FormCustomFields/components/AttachmentsModules';

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

const DmeReferralManager = props => {
    const {form, formItemLayout=formItemLayoutDefault, dmeReferral, user} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {getAttachments=[], provider, icd10Codes} = dmeReferral || {};
    // if we pass additional props
    console.log(icd10Codes);
    //const {id:assessmentId} = object || {};
    return <Form layout={'vertical'}>
        <FormItem
        // {...formItemLayout}
        // label={<FormattedMessage {...messages.attachments} />}
        >
        {getFieldDecorator('attachments', {
            initialValue: getAttachments
        })(
            <AttachmentsModules template={'discharge'} type={'dme'} buttonLabel={'Add DME'} attachmentLabel={'Element'} emptyMessage={'To begin adding DMEs, click the button below'} noEmptyImage patient={user} managerProps={{useProvider:false}} /*  date={getFieldValue('endDate')} /*task={task}*/ />
        )}
                    
        </FormItem>

        <FormItem
        // {...formItemLayout}
        label={'Provider'}
        // label={<FormattedMessage {...messages.attachments} />}
        >
        {getFieldDecorator('provider', {
            initialValue: provider
        })(
            <ProviderSelect />
        )}
                    
        </FormItem>

        <FormItem
            // {...tailFormItemLayout}
            label={'Diagnosis'}
            help={'Related ICD-10 Codes'}
        >
            {getFieldDecorator('icd10Codes', {
                initialValue: icd10Codes
            })(
                <DiagnosisSelect mode={'multiple'} />
            )}
        </FormItem>


        {/* <DrawerFooter>
            <Button type={'primary'} onClick={props.onSaveDraft}>Save as Draft</Button> <Button type={'primary'} onClick={props.onAssign}>Assign To {firstName}</Button>
        </DrawerFooter> */}
    </Form>
}

export default DmeReferralManager;