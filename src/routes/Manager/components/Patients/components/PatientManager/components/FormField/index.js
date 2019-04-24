import React from 'react';
import {Form, Input, Radio, Checkbox, Select} from 'antd';
// import BirthdayForm from '../FormFieldElement/BirthdayField';
// import EmailForm from '../FormFieldElement/EmailField';
// //import AddressForm from '../FormFieldElement/AddressField';
// import PhoneForm from '../FormFieldElement/PhoneField';
// import CohortsForm from '../FormFieldElement/CohortsField';
// import DropdownFormField from '../FormFieldElement/DropdownField/containers/index';
// import RadioFormField from '../FormFieldElement/RadioField/containers/index';
// import PlainFormField from '../FormFieldElement/PlainField/components';
// import AddressForm from '../FormFieldElement/AddressField';
import moment from 'moment';
import { DateField } from '../../../../../../../../components/FormCustomFields';
import { PhoneField } from '../../../../../../../../components/FormCustomFields/components/Phone';
import { AddressField } from '../../../../../../../../components/FormCustomFields/components/Address';
import { EmailField } from '../../../../../../../../components/FormCustomFields/components/Email';
import DoctorSelect from '../../../../../../../../components/Autosuggest/containers/DoctorSelect';

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

    const {valueObject} = report;
    let initialValueId = report.valueId || null;
    let initialValue = report.value || initialValueId;
    
    // console.log(report);
    // console.log(initialValue);
    

    let fieldName =  'field['+id+']';
    let noFieldDecorator = false;// do not show fieldDecorator
    let className;
    
    
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
            initialValue = initialValue ? moment(initialValue) : undefined;
            field = <DateField />
            break;
        case 'email':
            field = <EmailField />;
            //field = <EmailForm  email={patient.email} label={label} getFieldDecorator={getFieldDecorator} />;
            break;
        case 'address':
           
            initialValue = valueObject || {};
            field = <AddressField /> ;
            break;
        case 'phone':
            initialValue = valueObject || {};
            field = <PhoneField />;
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
            break;
        case 'gender':
        case 'radio':
            className = 'single-line';
            if (type === 'radio') {
                initialValue = initialValueId;
            }
            field = <span className={'ant-form-text'}>
            <Radio.Group>
                {options.map((option, i) => {
                    const value = option.id || option.key;
                    return <Radio key={i} style={radioStyle} value={value}>{option.label}</Radio>;
                })}
            </Radio.Group></span>;
                break;
        case 'cohorts':
        case 'checkbox':
            if (reports && reports.length > 0) {
                initialValue = reports.map(report =>  {
                    return report.valueId;
                });
            }
            field = <Checkbox.Group>
                {options.map((option) => {
                    const coid = option.id;
                    const name = option.label;
                    return <Checkbox key={coid} value={coid} style={vertStyle} >{name}</Checkbox>;
                })}
            </Checkbox.Group>
            break;
        case 'plain':
            field = <Input />;
            break;

            /// to add
        case 'doctor':
            field = <DoctorSelect disableSelect />
            break;
        case 'diagnosis':
        case 'medications':
        case 'allergies':
            field = <Input disabled />
            noFieldDecorator = true;
            break;
    }

    if (field) {

        if (noFieldDecorator) {
            return <FormItem {...formItemLayout}
            label={label}
            required={required}
            >
            {field}
            </FormItem>
        }
        if (fieldCode) {
            fieldName += '['+fieldCode+']';
        }

        // console.log('type_'+fieldName, 'fieldName');
        // console.log({type, useValueIdToReport}, 'value');
        // getFieldDecorator('type_'+fieldName, {initialValue: {type, useValueIdToReport}})(
        //    <div>1</div>
        // )
        // console.log(initialValue);
        return <FormItem {...formItemLayout}
        label={label}
        required={required}
        className={className}
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