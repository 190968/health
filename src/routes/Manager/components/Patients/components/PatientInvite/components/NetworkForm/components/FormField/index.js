import React from 'react';
import {Form, Input} from 'antd';
import BirthdayForm from '../FormFieldElement/BirthdayField';
import EmailForm from '../FormFieldElement/EmailField';
import AddressForm from '../FormFieldElement/AddressField';
import PhoneForm from '../FormFieldElement/PhoneField';
import CohortsForm from '../FormFieldElement/CohortsField';
import DropdownFormField from '../FormFieldElement/DropdownField/containers/index';
import RadioFormField from '../FormFieldElement/RadioField/containers/index';
import PlainFormField from '../FormFieldElement/PlainField/components';

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

const FormField = props => {
    const {field:formField, form} = props;
    //console.log(props, 'FORM FIELD');
    const { getFieldDecorator } = form;
    const {id, type, label, options=[], getChildren=[], required=false} = formField;
    const patient = {};

    if (getChildren.length > 0) {
        // if we have children
        return getChildren.map((field, i) => {
            return <FormField field={field} key={i} form={form} />
        })
    }
    let field = null;
    //console.log(props);
    switch(type) {
        // case 'full_name':
        //     return <FullNameForm    label={label} getChildren={getChildren}  getFieldDecorator={getFieldDecorator} />
        //     break;
        // case 'first_last_name':
        //     return <FullNameForm  firstName={patient.firstName} lastName={patient.lastName} label={label} getChildren={getChildren}  getFieldDecorator={getFieldDecorator} />
        //break;
            // case 'birthday':
            // case 'date':
            // field =  <BirthdayForm  birthday={patient.birthday} label={label} getFieldDecorator={getFieldDecorator} />;
            // break;
            // case 'email':
            // field = <EmailForm  email={patient.email} label={label} getFieldDecorator={getFieldDecorator} />;
            // break;
            // case 'address':
            // field = <AddressForm  address={patient.address} label={label} getFieldDecorator={getFieldDecorator} />;
            //     break;
            // case 'phone':
            // field = <PhoneForm  phone={patient.phone} label={label} getFieldDecorator={getFieldDecorator} />;
            //     break;
            // case 'tz':
            // case 'language':
            // case 'dropdown':
            // field = <DropdownFormField  label={label} options={options} />;
            // break;
            // case 'gender':
            //     case 'radio':
            //     field = <RadioFormField  label={label} options={options} />;
            //         break;
            // case 'cohorts':
            // case 'checkbox':
            // field = <CohortsForm  label={label} getFieldDecorator={getFieldDecorator} />;
            //     break;
            case 'plain':
                //field = ;
                break;
    }

    if (field) {
        console.log(field);
        return <FormItem {...formItemLayout}
        label={label}
        required={required}
        >
        {getFieldDecorator('field['+id+']', {
        })(
            <Input  />
        )}
        </FormItem>;
    } else {
        return null;
    }
}

export default FormField;