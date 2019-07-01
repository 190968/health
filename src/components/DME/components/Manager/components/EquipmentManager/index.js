import React from 'react';
import { ProcedureSelect } from '../../../../../Autosuggest/containers/ProcedureSelect';
import {InputNumber, Input, Form, Select } from 'antd';
import ProviderSelect from '../../../../../Autosuggest/containers/ProviderSelect';
import { ObjectSelect } from '../../../../../Autosuggest/containers/ObjectSelect';
const Option = Select.Option;
const FormItem = Form.Item;
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

const modifiers = [
    'RT', 'LT', 'NU', 'RR', 'KX', 'AW', 'AU', 'AV','KH','KI','KJ', 'K1', 'K2', 'K3', 'K4','CG', 'A1', 'A2', 'RA', 'KF', 'KS', 'A3', 'A4'
]


const categories = [
    {key:"1", label:'Cane'},
    {key:"2", label:"Crutches"},
    {key:"3", label:"Hospital Beds"},
    {key:'4', label:"Lifts"},
    {key:'5', label:"Oxygen"},
    {key:'6', label:"Ventilator"},
    {key:'7', label:"Walker"},
    {key:'8', label:"Wheelchair"},
    {key:'0', label:"Other"}
]
const DmeEquipmentManager = props => {
    const {form, formItemLayout=formItemLayoutDefault, equipment, type, managerProps} = props;
    const {getFieldDecorator, getFieldValue} = form;
    // if we pass additional props
    const {procedureCode, quantity, modifier, provider, equipmentCategory} = equipment || {};
    const { key, label } = equipmentCategory || {};
    const {useProvider=true} = managerProps || {};

    //const {id:assessmentId} = object || {};
    return <Form>
            {type === 'hcpc' ? <FormItem
                {...formItemLayout}
                label="Select Procedure Code"
            >
                {getFieldDecorator('procedureCode', {
                    initialValue:procedureCode,
                    rules: [{ required: true, message: 'Please Select Procedure code' }],
                })(
                    <ProcedureSelect />
                    )}
            </FormItem> : <>
            <FormItem
                {...formItemLayout}
                label="Select Category/Type"
            >
                {getFieldDecorator('equipmentCategory', {
                    initialValue:equipmentCategory,
                    rules: [{ required: true, message: 'Please Select Category' }],
                })(
                    <ObjectSelect items={categories}  />
                )}
            </FormItem>

            {(getFieldValue('equipmentCategory') && getFieldValue('equipmentCategory').key === '0') && <FormItem
                {...formItemLayout}
                label="Custom Category"
            >
                {getFieldDecorator('customCategory', {
                    initialValue:label,
                    rules: [{ required: true, message: 'Please Enter Category name' }],
                })(
                    <Input />
                    )}
            </FormItem> }
            </> }
            <FormItem
                {...formItemLayout}
                label="Quantity"
            >
                {getFieldDecorator('quantity', {
                    initialValue:quantity,
                    rules: [{ required: true, message: 'Please Enter Quantity' }],
                })(
                    <InputNumber />
                    )}
            </FormItem>
            {type === 'hcpc' && <FormItem
                {...formItemLayout}
                label="Modifier"
            >
                {getFieldDecorator('modifier', {
                    initialValue:modifier,
                    // rules: [{ required: true, message: 'Please Enter Modifier' }],
                })(
                    <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} notFoundContent={false} >
                    {modifiers.map((m,i) => <Option key={m}>{m}</Option>)}
                    </Select>
                )}
            </FormItem>}
            {useProvider && <FormItem
                {...formItemLayout}
                label="Provider"
            >
                {getFieldDecorator('provider', {
                    initialValue:provider,
                    rules: [{ required: true, message: 'Please Select Provider' }],
                })(
                    <ProviderSelect />
                )}
            </FormItem>}
        </Form>;
}

export default DmeEquipmentManager;