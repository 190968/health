import React from 'react';
import {Form, Input, Select} from 'antd';
import {MedicationSelect} from "../../../../../../components/Autosuggest/containers/MedicationSelect";
import {DateField} from "../../../../../../components/FormCustomFields/index";
import messages from './i18n/en';
import { FormattedMessage } from 'react-intl';
import DefaultI18nEn from '../../../../../../i18n/en';
import { HealthFormI18n } from '../../i18n/en';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const AllergyForm = (props) => {
    console.log(props);
    const {element={}, form, formItemLayout} = props;
    const {getFieldDecorator} = form;
    return <Form>
        <FormItem
            {...formItemLayout}
            label={'Medication'}
        >
            {getFieldDecorator('medication', {
                rules: [{
                    required: true,
                    // message: <FormattedMessage {...DefaultI18nEn.selectSomething} values={{title: <FormattedMessage {...messages.allergy} />}} />,
                }],
            })(
                <MedicationSelect />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label={<FormattedMessage {...messages.treatment} />}
        >
            {getFieldDecorator('treatment', {}
            )(
                <TextArea autosize={{ minRows: 1 }} />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label={<FormattedMessage {...messages.reaction} />}
        >
            {getFieldDecorator('reaction', {})(<TextArea autosize={{ minRows: 1 }} />)}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label={<FormattedMessage {...HealthFormI18n.risk} />}
        >
            {getFieldDecorator('severity', {})(
                <Select style={{width:'100%'}}>
                    <Select.Option key={'low'}>Low</Select.Option>
                    <Select.Option key={'medium'}>Medium</Select.Option>
                    <Select.Option key={'high'}>High</Select.Option>
                </Select>)}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label={<FormattedMessage {...messages.date} />}
        >
            {getFieldDecorator('date')(<DateField  />)}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label={<FormattedMessage {...HealthFormI18n.notes} />}
        >
            {getFieldDecorator('notes', {})(<TextArea autosize={{ minRows: 1 }} />)}
        </FormItem>
    </Form>
}

export default AllergyForm;