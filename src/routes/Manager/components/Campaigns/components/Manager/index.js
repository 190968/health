import React from 'react';
import {Form, Input, Radio} from 'antd';
import CohortSelect from '../../../../../../components/Autosuggest/containers/CohortSelect';
import ScreeningSelect from '../../../../../../components/Autosuggest/containers/ScreeningSelect';
import { DateField } from '../../../../../../components/FormCustomFields';
import moment from 'moment';
import {CampaignManagerMethod} from './containers/Method';
import { AttachmentsModules } from '../../../../../../components/FormCustomFields/containers/AttachmentsModules';
import { prepareAttachmentsFromSimpleConnection } from '../../../../../../components/FormCustomFields/components/Attachments';
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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

const CampaignManager = props => {
    const { campaign, form, formItemLayout=formItemLayoutDefault} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {title, description, getCohorts=[], getScreenings=[], getAttachments=[], executeDate, method, canBeEdited=false} = campaign || {};
    console.log(getAttachments);
    return <Form>
        <FormItem
            {...formItemLayout}
            label="Name"
        >
            {getFieldDecorator('name', {
                initialValue: title,
                rules: [{
                    required: true,
                    message: "Please enter name",
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
            label="Description"
        >
            {getFieldDecorator('description', {
                initialValue: description,
            })(
                <TextArea  autosize={{ minRows: 1 }} />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Screenings"
        >
            {getFieldDecorator('screenings', {
                initialValue: getScreenings,
                // rules: [{
                //     required: true,
                //     message: "Please enter Chemotherapy name",
                // }],
            })(
                <ScreeningSelect mode={'multiple'} />
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
        <FormItem
            {...formItemLayout}
            label="Method of Contact"
        >
            {getFieldDecorator('method', {
                initialValue: method,
                rules: [{
                    required: true,
                    message: "Please select method",
                }],
            })(
            <RadioGroup >
                <RadioButton value="assign">Assign</RadioButton>
                <RadioButton value="message">Message</RadioButton>
            </RadioGroup>
                // <div className={'ant-form-text'}><CampaignManagerMethod /></div>
            )}
        </FormItem>
        {getFieldValue('method') === 'assign' && <FormItem
            {...formItemLayout}
            label="Attachments"
        >
            {getFieldDecorator('attachments', {
                initialValue: prepareAttachmentsFromSimpleConnection(getAttachments),
                // rules: [{
                //     required: true,
                //     message: "Please enter Chemotherapy name",
                // }],
            })(
                <AttachmentsModules editable date={getFieldValue('executeDate')}  buttonLabel={'Select What to Assign'} />
            )}
        </FormItem>}

        {getFieldValue('method') === 'message' && <CampaignManagerMethod campaign={campaign} formItemLayout={formItemLayout} form={form}/>}
    </Form>
}

export default CampaignManager;
