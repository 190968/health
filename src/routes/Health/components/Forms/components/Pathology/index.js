import React from 'react';
import {Form, Input} from 'antd';
import {ClinicalTrialSelect} from "../../../../../../components/Autosuggest/containers/ClinicalTrialSelect";
import {DateField} from "../../../../../../components/FormCustomFields/index";
import {InputUnits, InputUnitsValidator, prepareInputUnitsValue} from "../../../../../../components/FormCustomFields/components/InputUnits/index";
import DefaultHealthFields from '../DefaultFields';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

export const PathologyForm = (props) => {
    const {element={}, form, formItemLayout} = props;
    const {getFieldDecorator} = form;
    //const {title='', code='', stage={}, chemotherapies=[]} = cancer;
    const {tumorHistology, tumorBehavior, tumorGrade, tumorSize, date} = element || {};
    console.log(element);
    
    return <Form>
        

        <FormItem
            {...formItemLayout}
            label='Tumor Histology'
        >
            {getFieldDecorator('tumorHistology', {
                    initialValue: tumorHistology,
                    rules: [{required: true, message: "Select Histology"}],
                }
            )(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Tumor Behavior'
        >
            {getFieldDecorator('tumorBehavior', {
                    initialValue: tumorBehavior,
                    rules: [{required: true, message: "Select Behavior"}],
                }
            )(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Tumor Grade'
        >
            {getFieldDecorator('tumorGrade', {
                    initialValue: tumorGrade,
                    rules: [{required: true, message: "Select Grade"}],
                }
            )(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Regional Size'
        >
            {getFieldDecorator('tumorSize', {
                initialValue: prepareInputUnitsValue(tumorSize),
                rules: [{validator:InputUnitsValidator, required: true, message: "Enter Tumor size"}],
                }
            )(
                <InputUnits />
            )}

            
        </FormItem>

        <DefaultHealthFields {...props} />

    </Form>
}

export default PathologyForm;


// export const preparePathologyInput = values => {
//     const {date,
//         tumorHistology,
//         tumorBehavior,
//         tumorGrade,
//         tumorSize} = values;

//     return {
//         pathology: {
//             date,
//             tumorHistology,
//             tumorBehavior,
//             tumorGrade,
//             tumorSize
//         }
//     }
// }