import React from 'react';
import {Form, Input, Button, Icon, Checkbox, Tooltip} from 'antd';
import { compose, withHandlers, withState, lifecycle} from 'recompose';
import {injectIntl} from 'react-intl';
import messages from './messages';
import {Options} from "../../../../../../../../components/FormCustomFields/components/Options/index";
import AdditionalInfo from './containers/AdditionalInfo';
import PlanElementBrahmsFormField from '../../_brahms';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};
const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20, offset: 4},
};


 

const ConditionElementBuilder = (props) => {
    const {form, intl, details, keys, plan, mode, element} = props;
    const {getFieldDecorator, getFieldValue} = form;
    // const {itemInfo={}, footnote=''} = element || {};
    const blankOption = {id:'', label:''};
    const {id, label:title, options = [blankOption, blankOption] } = details || {};
    // console.log(blankOption);
    const showBrahms = plan;// && id && id !== '';
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
                    <Input  ref={(input) => input && input.focus()} />
                )}
            </FormItem>

            <Options form={form} options={options} minLines={2} formItemLayout={formItemLayout} />

            {/* <AdditionalInfo form={form} formItemLayout={formItemLayout} footnote={footnote} /> */}

            {showBrahms && <PlanElementBrahmsFormField form={form} type={'optionId'} formItemLayout={formItemLayout}  possibleOptions={getFieldValue('options') || options} plan={plan} mode={mode} element={element}  possibleOptionsFormatter={props.possiblePlanElementOptionsFormatter} GoToComponent={props.GoToComponent} formatGoToElement={props.formatGoToElement} />}
   
        </React.Fragment>
    );
}


const enhance = compose(
    injectIntl,
);

export default enhance(ConditionElementBuilder);