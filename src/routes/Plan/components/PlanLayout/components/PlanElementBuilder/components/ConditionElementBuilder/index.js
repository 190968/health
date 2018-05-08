import React from 'react';
import {Form, Input, Button, Icon, Checkbox, Tooltip} from 'antd';
import { compose, withHandlers, withState, lifecycle} from 'recompose';
import {injectIntl} from 'react-intl';
import messages from './messages';
import {Options} from "../../../../../../../../components/FormCustomFields/components/Options/index";


const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};
const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20, offset: 4},
};



export const prepareInput = (values) => {
    console.log(values);
    const {title, schedule, keys=[], ids=[]} = values;
    let {options=[]} = values;
    options = keys.map(i => {
        const id =  ids[i] || '';// ? timesPerHour[i]['id'] : '';
        const label = options[i] || '';
        //const options = blockOptions[i] || [];
        return {id, label}
    });

    return {
        schedule:schedule,
        decisionElement: {
            title,
            options
        }
    }
}



const ConditionElementBuilder = (props) => {
    //console.log(props);
    const {form, intl, element={}, keys} = props;
    const {getFieldDecorator} = form;
    const {itemInfo={}} = element;
    const {label:title, options = [blankOption, blankOption] } = itemInfo;

    return (

        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.title)}
            >
                {getFieldDecorator('title', {
                        initialValue: title,
                        rules: [{required: true, message: "Enter Title", whitespace: true}],
                    }
                )(
                    <Input/>
                )}
            </FormItem>

            <Options form={form} options={options} minLines={2} />

        </React.Fragment>
    );
}

const blankOption = {id:'', title:''};
const enhance = compose(
    injectIntl,
);

export default enhance(ConditionElementBuilder);