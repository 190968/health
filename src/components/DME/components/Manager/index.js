import React from 'react';
import { Form, Select, Radio } from 'antd';
import { FileUpload } from '../../../FormCustomFields/containers/FileUpload';
import { DateField } from '../../../FormCustomFields';
import { DmeEquipmentsList } from './containers/EquipmentList';
import { prepareDateForForm } from '../../../../utils/datetime';
import { prepareEquipmentsForForm } from './containers/EquipmentManager';

const FormItem = Form.Item;
const Option = Select.Option;
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



export const DMEManagerFormFields = props => {
    const {form, formItemLayout=formItemLayoutDefault, date, DME, managerProps} = props;
    const {getFieldDecorator, getFieldValue} = form;
    // if we pass additional props
    // const {object} = assignObject || {};
    //const {id:assessmentId} = object || {};
    const {serviceDate, source, equipments, provider, dmePrescription, prescriptionType} = DME || {};
    return <React.Fragment>

        <FormItem
            {...formItemLayout}
            label="Source"
        >
            {getFieldDecorator('source', {
                initialValue:source,
                rules: [{ required: true, message: 'Please Enter Source' }],
            })(
                <Select style={{width:'100%'}}>
                    <Option key={'hcpc'}>HCPC Code</Option>
                    <Option key={'custom'}>Category/Type</Option>
                </Select>
                )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Equipment"
        >
            {getFieldDecorator('equipments', {
                initialValue: prepareEquipmentsForForm(equipments),
                rules: [{ required: true, message: 'Please Enter Equipment' }],
            })(
                <DmeEquipmentsList type={getFieldValue('source')} editable managerProps={managerProps} />
                )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label="Service Date"
        >
            {getFieldDecorator('serviceDate', {
                initialValue: prepareDateForForm(serviceDate),
                rules: [{ required: true, message: 'Please Select Service Date' }],
            })(
                <DateField />
                )}
        </FormItem>

        
        <FormItem
            {...formItemLayout}
            label="Prescription"
        >
            {getFieldDecorator('prescriptionType', {
                initialValue: prescriptionType,
                // rules: [{ required: true, message: 'Please Select Service Date' }],
            })(
                <Radio.Group >
                    <Radio.Button value="upload">Upload</Radio.Button>
                    <Radio.Button value="noneed">Not Needed</Radio.Button>
                    <Radio.Button value="procure">Procure</Radio.Button>
                </Radio.Group>
                )}
        </FormItem>
        {getFieldValue('prescriptionType') === 'upload' && <FormItem
            {...formItemLayout}
            label="Prescription"
        >
            {getFieldDecorator('dmePrescription', {
                initialValue: dmePrescription,
                // rules: [{ required: true, message: 'Please Select Service Date' }],
            })(
                <FileUpload type={'document'} />
                )}
        </FormItem>}

        </React.Fragment>
}

const DMEManager = props => {
    return <>
        <Form>
            <DMEManagerFormFields {...props} />
        </Form>
        </>
}

export default DMEManager;