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

const formItemLayoutDefault = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};
const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20, offset: 4},
};



const ChecklistElementBuilder = (props) => {
    const {form, intl, element={}, formItemLayout=formItemLayoutDefault} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {id,itemInfo} = element || {};
    const {label:title, options = [blankOption] } = itemInfo || {};
    // console.log(props);
    const showBrahms = id && id !== '';
    // console.log(props, 'props');
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

            {showBrahms && <PlanElementBrahmsFormField form={form} type={'number'} formItemLayout={formItemLayout}  possibleOptions={getFieldValue('options') || options} /*plan={plan}*/ element={element}  possibleOptionsFormatter={possiblePlanElementOptionsFormatter} GoToComponent={props.GoToComponent} formatGoToElement={props.formatGoToElement} />}
   
        </React.Fragment>
    );
}

const blankOption = {id:'', title:''};
const enhance = compose(
    injectIntl,
);

export default enhance(ChecklistElementBuilder);