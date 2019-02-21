import React from 'react';
import {Form, Select, Input, Checkbox} from 'antd';
import moment from 'moment';
import {DateField} from "../../../../../../components/FormCustomFields/index";
// import messages from './i18n/en';
// import { FormattedMessage } from 'react-intl';
// import DefaultI18nEn from '../../../../../../i18n/en';
// import { HealthFormI18n } from '../../i18n/en';
import { DiagnosisSelect } from '../../../../../../components/Autosuggest/containers/DiagnosisSelect';
import DefaultHealthFields from '../DefaultFields';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const formItemLayoutDefault = {
    labelCol: {span: 7},
    wrapperCol: {span: 17},
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 13,
            offset: 8,
        },
    },
};

const DiagnosisForm = (props) => {
    const {form, formItemLayout=formItemLayoutDefault, healthRecord, element} = props;
    const {getFieldDecorator} = form;
    const {isPrimary=false, riskLevel, notes, date} = healthRecord || {};
    const {code, status=''} = element || {};
    //const {id:codeId=''} = code;
    return <React.Fragment>
        <FormItem
            {...formItemLayout}
            label='Select Diagnosis'
        >
            {getFieldDecorator('code', {
                    initialValue: code,
                    rules: [{required: true, message: "Select Diagnosis"}],
                }
            )(
                <DiagnosisSelect />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label='Risk Level'
        >
            {getFieldDecorator('riskLevel', {
                initialValue: riskLevel,
                    rules: [{required: true, message: "Select Risk Level"}],
                }
            )(
                <Select style={{width:'100%'}}>
                    <Select.Option key={'low'}>Low</Select.Option>
                    <Select.Option key={'medium'}>Medium</Select.Option>
                    <Select.Option key={'high'}>High</Select.Option>
                </Select>
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label='Status'
        >
            {getFieldDecorator('status', {
                    initialValue: status,
                    rules: [{required: true, message: "Select Status"}],
                }
            )(
                <Select style={{width:'100%'}}>
                    <Select.Option key={'1'}>Active</Select.Option>
                    <Select.Option key={'3'}>Refuted</Select.Option>
                </Select>
            )}
        </FormItem>
        <FormItem
            {...tailFormItemLayout}
        >
            {getFieldDecorator('isPrimary',
                {
                    initialValue: isPrimary,
                    valuePropName: 'checked'
                }
            )(
                <Checkbox>Current</Checkbox>
            )}
        </FormItem>
        <DefaultHealthFields {...props} />
    </React.Fragment>
}

export default DiagnosisForm;