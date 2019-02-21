import React from 'react';
import { Card } from 'antd';
import moment from 'moment';
import Description from '../../../../../../../../../../../../components/Layout/DescriptionList/Description';
import {PhoneFieldView} from '../../../../../../../../../../../../components/FormCustomFields/components/Phone/view';
import { AddressFieldView } from '../../../../../../../../../../../../components/FormCustomFields/components/Address/view';

const ProfileSectionField = props => {
    const {field, user} = props;

    let {label} = field || {};
    const { type, getChildren, options=[],  reports=[]} = field || {};
    //const {label, fields=[]} = section || {};
    const report = reports && reports[0] || {};
    let {value, valueId} = report || {};
    console.log(props);
    // switch (type) {
    //     case 'full_name':
    //         value = user.fullName;
    //     break;  
    //     case 'birthday':
    //         value = moment(value).format('l');
    //         break;
    //     case 'radio':

    //         break;
    //     default:
    //         break;
    // }




    // if (reports && reports.length > 0) {
    //     report = reports[0];
    // }

    let {valueObject} = report || {};
    let initialValueId = report.valueId || null;
    let initialValue = report.value || initialValueId;
    
    // console.log(report);
    // console.log(initialValue);
    

    let selectedOption = null;
    //console.log(props);
    switch(type) {
        case 'full_name':
            value = user.fullName;
            break; 
        case 'birthday':
        case 'date':
            value = moment(value).format('l');
            break;
        case 'email':
           // field = <Input />
            //field = <EmailForm  email={patient.email} label={label} getFieldDecorator={getFieldDecorator} />;
            break;
        case 'address':
            if (valueObject) {
                value = <AddressFieldView address={valueObject} />;//'phone';
            }
        //field = 11111;//<AddressForm address={} />
        //field = <AddressForm  address={patient.address} label={label} getFieldDecorator={getFieldDecorator} />;
            break;
        case 'phone':
            if (valueObject) {
                value = <PhoneFieldView phone={valueObject} />;//'phone';
            }
        //field = <PhoneForm  phone={patient.phone} label={label} getFieldDecorator={getFieldDecorator} />;
            break;
        case 'tz':
        case 'language':
        case 'dropdown':
            selectedOption = options.find(value => value.id === valueId);
            value = selectedOption && selectedOption.label;
            break;
        case 'gender':
            selectedOption = options.find(val => val.key === value);
            value = selectedOption && selectedOption.label;
        break;
        case 'radio':
            selectedOption = options.find(value => value.id === valueId);
            value = selectedOption && selectedOption.label;
            // if (type === 'radio') {
            //     initialValue = initialValueId;
            // }
            // field = <Radio.Group>
            //     {options.map((option, i) => {
            //         const value = option.id || option.key;
            //         return <Radio key={i} style={radioStyle} value={value}>{option.label}</Radio>;
            //     })}
            // </Radio.Group>
                break;
        case 'cohorts':
        case 'checkbox':

            if (reports && reports.length > 0) {
                const checkboxValues = reports.map(report =>  {
                    return report.valueId;
                });
           
                // console.log(options);
                // console.log(reports);
                // console.log(checkboxValues);
                selectedOption = options.filter(value => checkboxValues.includes(value.id));
                // console.log(selectedOption,'selectedOption');
                const checkboxLabels = selectedOption && selectedOption.map(val => val.label);
                value = checkboxLabels.join(', ');
            }
            // // console.log(initialValue);
            // // console.log(reports);
            // if (reports && reports.length > 0) {
            //     initialValue = reports.map(report =>  {
            //         return report.valueId;
            //     });
            // }
            // // console.log(initialValue);
            // // console.log(options);
            // field = <Checkbox.Group>
            //     {options.map((option) => {
            //         const coid = option.id;
            //         const name = option.label;
            //         return <Checkbox key={coid} value={coid} style={vertStyle} >{name}</Checkbox>;
            //     })}
            // </Checkbox.Group>
        //field = <CohortsForm options={options} />;
            break;
        case 'plain':
            // field = <Input />;
        break;

        /// to add
        case 'doctor':
            //field = <DoctorSelect disabled />
            break;
        case 'diagnosis':
        case 'medications':
        case 'allergies':
            // field = <Input disabled />
            // noFieldDecorator = true;
            break;
    }



    return <Description term={label} excludeEmpty>{value}</Description>;
}

export default ProfileSectionField;