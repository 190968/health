import React from 'react';
import {Form, Input, Select} from 'antd';
import {DateField} from "../../../../../../components/FormCustomFields/index";
import {DiagnosisSelect} from "../../../../../../components/Autosuggest/containers/DiagnosisSelect";
import {withOncologyEnumsQuery} from "./query";
import DefaultHealthFields from '../DefaultFields';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const OncologyFormPure = (props) => {
    const {form, ...otherProps} = props;
    const {getFieldDecorator} = form;
    const {element,oncologyTypes=[], oncologyDisorders=[], oncologyBehaviors=[], loading=false, formItemLayout} = otherProps;
    //const {title='', code='', stage={}, chemotherapies=[]} = cancer;
    const {diagnosis, date, type, disorder, behavior, organSystem, anatomicSite} = element || {};
    //const {id:icd10code} = diagnosis || {};
    //console.log(element);
 

    return <React.Fragment>
        <FormItem
            {...formItemLayout}
            label="Diagnosis"
        >
            {getFieldDecorator('diagnosis', {
                initialValue: diagnosis,
                rules: [{
                    required: true,
                    message: "Please select Diagnosis",
                }],
            })(
                <DiagnosisSelect getFullInfo />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Diagnosis Type'
        >
            {getFieldDecorator('type', {
                initialValue: type,
                rules: [{
                    required: true,
                    message: "Select Type",
                }],
                }
            )(
                <Select style={{width:'100%'}}>
                    {oncologyTypes.map(info => {
                        return  <Select.Option key={info.name}>{info.description}</Select.Option>
                    })}
                </Select>
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Disorder'
        >
            {getFieldDecorator('disorder', {
                initialValue: disorder,
                rules: [{
                    required: true,
                    message: "Please select Disorder",
                }],
                }
            )(
                <Select style={{width:'100%'}}>
                    {oncologyDisorders.map(info => {
                        return  <Select.Option key={info.name}>{info.description}</Select.Option>
                    })}
                </Select>
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label='Behavior'
        >
            {getFieldDecorator('behavior', {
                initialValue: behavior,
                rules: [{
                    required: true,
                    message: "Please select Behavior",
                }],
                }
            )(
                <Select style={{width:'100%'}}>
                    {oncologyBehaviors.map(info => {
                        return  <Select.Option key={info.name}>{info.description}</Select.Option>
                    })}
                </Select>
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label='Organ System'
        >
            {getFieldDecorator('organSystem', {
                initialValue: organSystem,
                }
            )(
                <Input  />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label='Anatomic Site'
        >
            {getFieldDecorator('anatomicSite', {
                initialValue: anatomicSite,
                }
            )(
                <Input  />
            )}
        </FormItem>

        <DefaultHealthFields {...props} />
    </React.Fragment>
}

export const OncologyForm = withOncologyEnumsQuery(OncologyFormPure);
export default OncologyForm;

// export const prepareOncologyInput = values => {
//     const {diagnosis,
//         type,
//         disorder,
//         behavior,
//         organSystem,
//         anatomicSite,
//         date} = values;

//     return {
//         oncology: {
//             diagnosis,
//             type,
//             disorder,
//             behavior,
//             organSystem,
//             anatomicSite,
//             date
//         }
//     }
// }