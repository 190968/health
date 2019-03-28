import React from 'react';
import {injectIntl} from 'react-intl';
import {Form, Input} from 'antd';
import messages from './messages';
import PlanSelect from "../../../../../../../../components/Autosuggest/containers/PlanSelect";
const FormItem = Form.Item;
const TextArea = Input.TextArea;

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const formTailLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19, offset: 5},
};

const ApElementBuilder = (props) => {
    const {form, intl,  details} = props;
    const {getFieldDecorator} = form;
    const plan = details || {};
    return (
        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label={'ActionPlan'}
            >
                {getFieldDecorator('plan', {
                        initialValue:plan,
                        rules: [{required: true, message: "Select ActionPlan"}],
                    }
                )(
                    <PlanSelect getFullInfo />
                )}
            </FormItem>
        </React.Fragment>
    );
}

export default injectIntl(ApElementBuilder);
