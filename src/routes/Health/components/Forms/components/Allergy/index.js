import React from 'react';
import {Form, Input, Select} from 'antd';
import moment from 'moment';
import {ClinicalTrialSelect} from "../../../../../../components/Autosuggest/containers/ClinicalTrialSelect";
import {DateField} from "../../../../../../components/FormCustomFields/index";
import messages from './i18n/en';
import { FormattedMessage } from 'react-intl';
import DefaultI18nEn from '../../../../../../i18n/en';
import { HealthFormI18n } from '../../i18n/en';
import DefaultHealthFields from '../DefaultFields';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const AllergyForm = (props) => {
    console.log(props);
    const {element={}, form, formItemLayout, healthRecord} = props;
    const {getFieldDecorator} = form;
    const {notes, date} = healthRecord || {};

    const {title, treatment, reaction, severity} = element;
    return <Form>
        <FormItem
            {...formItemLayout}
            label={<FormattedMessage {...messages.allergy} />}
        >
            {getFieldDecorator('allergy', {
                initialValue: title,
                rules: [{
                    required: true,
                    message: <FormattedMessage {...DefaultI18nEn.selectSomething} values={{title: <FormattedMessage {...messages.allergy} />}} />,
                }],
            })(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label={<FormattedMessage {...messages.treatment} />}
        >
            {getFieldDecorator('treatment', {
                initialValue: treatment,
            }
            )(
                <TextArea autosize={{ minRows: 1 }} />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label={<FormattedMessage {...messages.reaction} />}
        >
            {getFieldDecorator('reaction', {
                initialValue: reaction,
            })(<TextArea autosize={{ minRows: 1 }} />)}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label={<FormattedMessage {...HealthFormI18n.risk} />}
        >
            {getFieldDecorator('severity', {
                initialValue: severity,
            })(
                <Select style={{width:'100%'}}>
                    <Select.Option key={'low'}>Low</Select.Option>
                    <Select.Option key={'medium'}>Medium</Select.Option>
                    <Select.Option key={'high'}>High</Select.Option>
                </Select>)}
        </FormItem>

        <DefaultHealthFields {...props} />
    </Form>
}

export default AllergyForm;