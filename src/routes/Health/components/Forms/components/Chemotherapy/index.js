import React from 'react';
import {Form, Input, InputNumber} from 'antd';
import {toNumber} from "../../../../../../utils/main";
import DefaultHealthFields from '../DefaultFields';
import { ChemotherapySelect } from '../../../../../../components/Autosuggest/containers/ChemotherapySelect';

const FormItem = Form.Item;

export const prepareChemotherapyInput = (values) => {
    let element = {...values,
        chemotherapyId: values.chemotherapy.id,
        cycles:parseInt(values.cycles),
        days:parseInt(values.days),
        timesPerDay:parseInt(values.timesPerDay),
        chemotherapy: undefined
    }
    //console.log(values);
    return element
};

const ChemotherapyForm = (props) => {
    const {element={}, form, formItemLayout} = props;
    const {getFieldDecorator} = form;
    const {chemotherapy, cycles, days, timesPerDay} = element;





    // const {element={}} = details;
    // const {info={}} = element;
    // const {chemotherapyElement=info} = details;
    // const {chemotherapy={id:''}} = info;
    // const {id='',chemotherapyId=chemotherapy.id, } = chemotherapyElement;
    //console.log(props,'TRTETET');
    // getFieldDecorator('id', {
    //     initialValue:id,
    // });
    return (
        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label="Chemotherapy"
            >
                {getFieldDecorator('chemotherapy', {
                    initialValue:chemotherapy,
                    rules: [{required: true,  message: "Enter Text"}],
                    validateTrigger: ['onChange', 'onSelect'],
                })(
                    <ChemotherapySelect getFullInfo />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Cycles"
            >
                {getFieldDecorator('cycles', {
                    initialValue:cycles,
                    rules: [{required: true, type:'number',  transform: toNumber, message: "Enter Cycles", whitespace: true}],
                })(
                    <InputNumber />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="No of days"
            >
                {getFieldDecorator('days', {
                    initialValue:days,
                    rules: [{required: true, type:'number',  transform: toNumber, message: "Enter Days", whitespace: true}],
                })(
                    <InputNumber />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Times per day"
            >
                {getFieldDecorator('timesPerDay', {
                    initialValue:timesPerDay,
                    rules: [{required: true, type:'number',  transform: toNumber, message: "Enter Times per day", whitespace: true}],
                })(
                    <InputNumber />
                )}
            </FormItem>
            <DefaultHealthFields {...props} />
        </React.Fragment>
    );
};



export default ChemotherapyForm;