import React from 'react';
import {injectIntl} from 'react-intl';
import {Form, Input} from 'antd';
import {compose, withHandlers, withState, withProps} from 'recompose';
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const formTailLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19, offset: 5},
};

const TimelineCalculatorElementBuilder = (props) => {
    const {form, intl, element, attachments=[]} = props;
    const {getFieldDecorator} = form;
    const {details} = element || {};
    const {title, resultInfo} = details || {};
    const {value, formula} = resultInfo || {};
    console.log(props, 'clculat');
    return (
        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label={'Title'}
            >
                {getFieldDecorator('title', {
                        initialValue:title,
                        rules: [{required: true, message: "Enter Title", whitespace: true}],
                    }
                )(
                    <Input />
                )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={'Value'}
            >
                {getFieldDecorator('value', {
                        initialValue: formula+'='+value,
                        rules: [{required: true, message: "Enter Value", whitespace: true}],
                    }
                )(
                    <Input />
                )}
            </FormItem>

              
        </React.Fragment>
    );
}


const enhance = compose(
    injectIntl,
);

export default enhance(TimelineCalculatorElementBuilder);