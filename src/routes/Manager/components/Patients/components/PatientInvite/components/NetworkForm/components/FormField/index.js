import React from 'react';
import {Form, Input, Radio, Checkbox, Select} from 'antd';
import BirthdayForm from '../FormFieldElement/BirthdayField';
import EmailForm from '../FormFieldElement/EmailField';
//import AddressForm from '../FormFieldElement/AddressField';
import PhoneForm from '../FormFieldElement/PhoneField';
import CohortsForm from '../FormFieldElement/CohortsField';
import DropdownFormField from '../FormFieldElement/DropdownField/containers/index';
import RadioFormField from '../FormFieldElement/RadioField/containers/index';
import PlainFormField from '../FormFieldElement/PlainField/components';
import AddressForm from '../FormFieldElement/AddressField';
import { DateField } from '../../../../../../../../../../components/FormCustomFields';
import moment from 'moment';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const vertStyle = {
        display: 'block',
        marginLeft: 0,
    };

const FormField = props => {
    const {field:formField, form} = props;
    //console.log(props, 'FORM FIELD');
    const { getFieldDecorator } = form;
    const {id, type, fieldCode, label, useValueIdToReport=false, options=[], getChildren=[], reports=[], isMandatory:required=false} = formField;
    const patient = {};
    //console.log(props, 'props');
    //console.log(reports, 'reports');

    if (getChildren.length > 0) {
        //return null;
        // if we have children
        return getChildren.map((field, i) => {
            let fieldReports = reports.filter(report => report.fieldCode === field.fieldCode);
            return <FormField field={{...field, id, reports:fieldReports}} key={i} form={form} />
        })
    }
    let field = null;
    let report = {};
    if (reports && reports.length > 0) {
        report = reports[0];
    }

    let initialValueId = report.valueId || null;
    let initialValue = report.value || initialValueId;
    
    // console.log(report);
    // console.log(initialValue);
    

    let fieldName =  'field['+id+']';
    
    if (fieldCode) {
        fieldName += '['+fieldCode+']';
    }
    //console.log(props);
    switch(type) {
        // case 'full_name':
        //     return <FullNameForm    label={label} getChildren={getChildren}  getFieldDecorator={getFieldDecorator} />
        //     break;
        // case 'first_last_name':
        //     return <FullNameForm  firstName={patient.firstName} lastName={patient.lastName} label={label} getChildren={getChildren}  getFieldDecorator={getFieldDecorator} />
        //break;
            case 'birthday':
            case 'date':
            initialValue = moment(initialValue);
            field = <DateField />
            //field =  <BirthdayForm  birthday={patient.birthday} label={label} getFieldDecorator={getFieldDecorator} />;
            break;
            case 'email':
            field = <Input />
            //field = <EmailForm  email={patient.email} label={label} getFieldDecorator={getFieldDecorator} />;
            break;
            case 'address':
            field = null;//<AddressForm address={} />
            //field = <AddressForm  address={patient.address} label={label} getFieldDecorator={getFieldDecorator} />;
                break;
            case 'phone':
            //field = <PhoneForm  phone={patient.phone} label={label} getFieldDecorator={getFieldDecorator} />;
                break;
            case 'tz':
            case 'language':
            case 'dropdown':
            initialValue = initialValueId;
            field = <Select showSearch>
                {options.map((option, i) => {
                        const value = option.id;
                        return <Select.Option key={i}   value={value}>{option.label}</Select.Option>;
                })}
          </Select>
            //field = <DropdownFormField  label={label} options={options} />;
            break;
            case 'gender':
            case 'radio':
                if (type === 'radio') {
                    initialValue = initialValueId;
                }
                field = <Radio.Group>
                    {options.map((option, i) => {
                        const value = option.id || option.key;
                        return <Radio key={i} style={radioStyle} value={value}>{option.label}</Radio>;
                    })}
                </Radio.Group>
                    break;
            case 'cohorts':
            case 'checkbox':
            if (reports) {
                initialValue = reports.map(report =>  {
                    return report.valueId;
                });
            }
            field = <Checkbox.Group>{options.map((option) => {
                const coid = option.id;
                const name = option.label;
                return <Checkbox key={coid} value={coid} style={vertStyle} >{name}</Checkbox>;
            })}</Checkbox.Group>
            //field = <CohortsForm options={options} />;
                break;
            case 'plain':
            field = <Input />;
            break;
    }

    if (field) {
        getFieldDecorator('type_'+fieldName, {initialValue: {type, useValueIdToReport}})(
            field
        )
        //console.log(initialValue);
        return <FormItem {...formItemLayout}
        label={label}
        required={required}
        >
        {getFieldDecorator(fieldName, {initialValue})(
            field
        )}
        </FormItem>;
    } else {
        return null;
    }
}

export default FormField;