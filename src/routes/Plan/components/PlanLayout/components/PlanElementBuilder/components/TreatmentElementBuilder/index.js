import React from 'react';
import {Form, Input} from 'antd';
import {FormattedMessage} from 'react-intl';
import messages from './messages';
import TreatmentElementBlocks from './containers/TreatmentBlockOptions';
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const formTailLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19, offset: 5},
};







export const prepareInput = (values) => {
    const {title} = values;
    let {elements=[]} = values;
    console.log(values);
    //console.log(elements);
    //  elements = elements.map(({option}) => {
    //      return option;
    //  });

    return {
        treatmentElement: {
            title,
            elements
        }
    }
}
 

const TreatmentElementBuilder = (props) => {
    //console.log(props);
    const {form, intl, element={}, user} = props;
    const {getFieldDecorator} = form;
    //const {itemInfo={}} = element;
    const {id, title, elements=[]} = element || {};
    //console.log(elements);
    //const keys =  [];//getFieldValue('keys', {initialValue:[]});
    //console.log(elements.map(option => prepareElementForMutation(option)));

    return (
        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label={'Title'}
            >
                {getFieldDecorator('title', {
                        initialValue: title,
                        rules: [{required: true, message: "Enter Title", whitespace: true}],
                    }
                )(<Input/>)}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={<FormattedMessage  {...messages.treatments} />}
                required={true}
            >
                    {getFieldDecorator(`elements`, {
                        initialValue: elements//.map(option => prepareElementForMutation(option))
                    })
                    (<TreatmentElementBlocks user={user} />)}

            </FormItem>

        </React.Fragment>
    );
}
export default TreatmentElementBuilder;