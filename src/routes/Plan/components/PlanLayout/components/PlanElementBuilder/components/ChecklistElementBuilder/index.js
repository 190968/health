import React from 'react';
import {Form, Input, Select} from 'antd';
import { compose, withHandlers, withState, lifecycle} from 'recompose';
import {injectIntl} from 'react-intl';
import messages from './messages';
import {Options} from "../../../../../../../../components/FormCustomFields/components/Options/index";
import AssessmentQuestionBrahmsFormField from '../../../../../../../../components/Assessment/components/Builder/components/Question/_brahms';
import PlanElementBrahmsFormField from '../../_brahms';
import { possiblePlanElementOptionsFormatter } from '../..';
import { CustomOptionsList } from '../../../../../../../../components/FormCustomFields/containers/CustomOptionsList';
import FootnoteManager from '../../../../../../../../components/Footnote/components/Manager';
import { FootnoteFormField } from '../../../../../../../../components/Footnote/components/Manager/field';


const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};
const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20, offset: 4},
};


const OptionItemPure = props => {
    const {value, onChange, updateFootnote} = props;
    const {label, footnote} = value || {} ;
    // const {text} = footnote || {};
    return <Input value={label} onChange={onChange} suffix={<FootnoteManager placement={'topRight'} footnote={footnote} onChange={updateFootnote} />} />;
}
const enhance = compose(
    withHandlers({
        onChange: props => (e) => {
            const {value} = props;
            const label = e.target.value;
            if (props.onChange) {
                props.onChange({...value, label});
            }
        },
        updateFootnote: props => (footnote) => {
            const {value} = props;
            if (props.onChange) {
                props.onChange({...value, footnote});
            }
        }
    })
);

const OptionItem = enhance(OptionItemPure);
// const blankOption = {id:'', label:''};

const ChecklistElementBuilder = (props) => {
    const {form, intl, details={}, /*formItemLayout=formItemLayoutDefault,*/ plan, type, mode, element} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {id, label:title, footnote, options = [{id:'', label:''}] } = details || {};
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

            <FormItem
            {...formItemLayout}
            label="Options"
            >
             {getFieldDecorator('options', {
                initialValue: options,
            })(
                <CustomOptionsList CustomComponent={OptionItem} blankItem={[]} />
            )}
            </FormItem> 
            {/* <Options form={form} options={options} title="To Do" formItemLayout={formItemLayout} /> */}

            <FormItem
            {...formItemLayout}
            label="Footnote"
            >
             {getFieldDecorator('footnote', {
                initialValue: footnote,
            })(
                <FootnoteFormField />
            )}
            </FormItem> 

            {showBrahms && <PlanElementBrahmsFormField form={form} type={'optionId'} formItemLayout={formItemLayout}  possibleOptions={getFieldValue('options') || options} element={element} plan={plan} mode={mode} GoToComponent={props.GoToComponent} formatGoToElement={props.formatGoToElement} excludeActions={excludeBrahmsActions} />}
   
            {/* {showBrahms && <PlanElementBrahmsFormField form={form} type={'optionId'} formItemLayout={formItemLayout}  possibleOptions={getFieldValue('options') || options} plan={plan} mode={mode} element={{type, ...element}} possibleOptionsFormatter={possiblePlanElementOptionsFormatter} GoToComponent={props.GoToComponent} formatGoToElement={props.formatGoToElement} />} */}
   
        </React.Fragment>
    );
}

export default injectIntl(ChecklistElementBuilder);