import React from 'react';
import {Form, Input} from 'antd';
import {ProcedureSelect} from "../../../../../../components/Autosuggest/containers/ProcedureSelect";
import {DateField} from "../../../../../../components/FormCustomFields/index";
import {InputUnits, prepareInputUnitsValue, InputUnitsValidator} from "../../../../../../components/FormCustomFields/components/InputUnits/index";
import DefaultHealthFields from '../DefaultFields';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

export const RadiologyForm = (props) => {
    const {element={}, form, formItemLayout} = props;
    const {getFieldDecorator} = form;
    //const {title='', code='', stage={}, chemotherapies=[]} = cancer;
    const {procedure, tumorSize, regionalLymphNodes} = element;
    //const {id:procedureId} = procedure || {};
    console.log(props);
    return <Form>
        

        <FormItem
            {...formItemLayout}
            label='Procedure'
        >
            {getFieldDecorator('procedure', {
                    initialValue: procedure,
                    rules: [{required: true, message: "Select Procedure"}],
                }
            )(
                <ProcedureSelect getFullInfo />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Tumorsize'
        >
            {getFieldDecorator('tumorSize', {
                initialValue: prepareInputUnitsValue(tumorSize),
                rules: [{validator:InputUnitsValidator, required: true, message: "Enter Tumor size"}],
                }
            )(
                <InputUnits />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Regional Lymph Nodes'
        >
            {getFieldDecorator('regionalLymphNodes', {
                initialValue: regionalLymphNodes,
                }
            )(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Metastatic Sites'
        >
            {getFieldDecorator('metastaticSites', {
                initialValue: regionalLymphNodes,
                }
            )(
                <Input />
            )}
        </FormItem>
        <DefaultHealthFields {...props} />
    </Form>
}

export default RadiologyForm;


// export const prepareRadiologyInput = values => {
//     const {date,
//         procedure,
//         tumorSize,
//         regionalLymphNodes,
//         metastaticSites} = values;

//     return {
//         radiology: {
//             date,
//             procedure,
//             tumorSize,
//             regionalLymphNodes,
//             metastaticSites
//         }
//     }
// }