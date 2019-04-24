import React from 'react';
import {Form, Input, Select} from 'antd';
import { compose, withHandlers, withState, lifecycle} from 'recompose';
import {injectIntl} from 'react-intl';
import messages from './messages';
import {Options} from "../../../../../../../../components/FormCustomFields/components/Options/index";
import AssessmentQuestionBrahmsFormField from '../../../../../../../../components/Assessment/components/Builder/components/Question/_brahms';
import PlanElementBrahmsFormField from '../../_brahms';
import { possiblePlanElementOptionsFormatter } from '../..';


const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};
const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20, offset: 4},
};


// const blankOption = {id:'', label:''};

const ChecklistElementBuilder = (props) => {
    const {form, intl, details={}, /*formItemLayout=formItemLayoutDefault,*/ plan, type, mode, element} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {id, label:title, options = [{id:'', label:''}] } = details || {};
    // console.log(props);
    const showBrahms = plan;// && id && id !== '';

    let excludeBrahmsActions = [];
    if (showBrahms) {
        if (plan.type === 'pathway') {
            excludeBrahmsActions.push('goto', 'finish');
        }
    }
    //  console.log(blankOption, 'Checklist blankOption');
    //  console.log(props, 'Checklist Props');
    //  console.log(details, 'Checklist details');
    //  console.log(options, 'Checklist options');
    //  console.log(getFieldValue('options'), 'Checklist options');
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

            <Options form={form} options={options} title="To Do" formItemLayout={formItemLayout} />

            {showBrahms && <PlanElementBrahmsFormField form={form} type={'optionId'} formItemLayout={formItemLayout}  possibleOptions={getFieldValue('options') || options} element={element} plan={plan} mode={mode} GoToComponent={props.GoToComponent} formatGoToElement={props.formatGoToElement} excludeActions={excludeBrahmsActions} />}
   
            {/* {showBrahms && <PlanElementBrahmsFormField form={form} type={'optionId'} formItemLayout={formItemLayout}  possibleOptions={getFieldValue('options') || options} plan={plan} mode={mode} element={{type, ...element}} possibleOptionsFormatter={possiblePlanElementOptionsFormatter} GoToComponent={props.GoToComponent} formatGoToElement={props.formatGoToElement} />} */}
   
        </React.Fragment>
    );
}

const enhance = compose(
    injectIntl,
);

export default enhance(ChecklistElementBuilder);