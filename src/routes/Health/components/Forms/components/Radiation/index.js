import React from 'react';
import { Form, Input } from 'antd';
import { ClinicalTrialSelect } from "../../../../../../components/Autosuggest/containers/ClinicalTrialSelect";
import { DateField } from "../../../../../../components/FormCustomFields/index";
import { InputUnits, InputUnitsValidator, prepareInputUnitsValue } from "../../../../../../components/FormCustomFields/components/InputUnits/index";
import DefaultHealthFields from '../DefaultFields';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

export const RadiationForm = (props) => {
    const { element = {}, form, formItemLayout } = props;
    const { getFieldDecorator } = form;
    //const {title='', code='', stage={}, chemotherapies=[]} = cancer;
    const { date, regionalFractions, regionalModality, treatmentAnatomicSite, treatmentTechnique, regionalDose } = element;


    return <Form>
        

        <FormItem
            {...formItemLayout}
            label='Treatment Anatomic Site'
        >
            {getFieldDecorator('treatmentAnatomicSite', {
                initialValue: treatmentAnatomicSite,
                rules: [{ required: true, message: "Select Treatment Anatomic Site" }],
            }
            )(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Treatment Technique'
        >
            {getFieldDecorator('treatmentTechnique', {
                initialValue: treatmentTechnique,
                rules: [{ required: true, message: "Select Treatment Technique" }],
            }
            )(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Regional Modality'
        >
            {getFieldDecorator('regionalModality', {
                initialValue: regionalModality,
                rules: [{ required: true, message: "Select Regional Modality" }],
            }
            )(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Regional Dose'
        >
         {getFieldDecorator('regionalDose', {
                initialValue: prepareInputUnitsValue (regionalDose),
                rules: [{validator:InputUnitsValidator, required: true, message: "Enter Regional Dos"}],
                }
            )(
                <InputUnits placeholderUnits={'units'} />
            )}

        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Regional Fractions'
        >
            {getFieldDecorator('regionalFractions', {
                initialValue: regionalFractions,
                rules: [{ required: true, message: "Select Regional Fractions" }],
            }
            )(
                <Input />
            )}
        </FormItem>

        <DefaultHealthFields {...props} />

    </Form>
}

export default RadiationForm;


// export const prepareRadiationInput = values => {
//     const {date,
//         treatmentAnatomicSite,
//         treatmentTechnique,
//         regionalModality,
//         regionalDose,
//         regionalFractions} = values;

//     return {
//         radiation: {
//             date,
//             treatmentAnatomicSite,
//             treatmentTechnique,
//             regionalModality,
//             regionalDose,
//             regionalFractions
//         }
//     }
// }

//  const propare = () => {

// }