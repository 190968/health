import React from 'react';
import {Form, Input, Button, Icon, Checkbox, Tooltip} from 'antd';
import { compose, withHandlers, withState, lifecycle} from 'recompose';
import {injectIntl} from 'react-intl';
import messages from './messages';
import {Options} from "../../../../../../../../components/FormCustomFields/components/Options/index";
import AdditionalInfo from './containers/AdditionalInfo';
import PlanElementBrahmsFormField from '../../_brahms';
import { CustomOptionsList } from '../../../../../../../../components/FormCustomFields/containers/CustomOptionsList';
import FootnoteManager  from '../../../../../../../../components/Footnote/components/Manager';
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
    const {value, onChange, updateFootnote, isDecision} = props;
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
 

const ConditionElementBuilder = (props) => {
    const {form, intl, details, type, plan, mode, element} = props;
    const {getFieldDecorator, getFieldValue} = form;
    // const {itemInfo={}, footnote=''} = element || {};
    // const blankOption = ;
    const {id, label:title, footnote, options = [{id:'', label:''}, {id:'', label:''}] } = details || {};
    // console.log(blankOption);
    const showBrahms = plan;// && id && id !== '';
    // if (showBrahms) {
    //     if (plan.type === 'pathway') {
    //         showBrahms = false;
    //     }
    // }
    const isDecision = type === 'decision';
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
                <CustomOptionsList CustomComponent={OptionItem} isDecision={isDecision} blankItem={[]} />
            )}
            </FormItem> 
            {/* <Options form={form} options={options} minLines={2} formItemLayout={formItemLayout} /> */}

            {/* <AdditionalInfo form={form} formItemLayout={formItemLayout} footnote={footnote} /> */}
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
            {showBrahms && <PlanElementBrahmsFormField form={form} type={'optionId'} formItemLayout={formItemLayout}  possibleOptions={getFieldValue('options') || options} plan={plan} mode={mode} element={{type, ...element}}  possibleOptionsFormatter={props.possiblePlanElementOptionsFormatter} GoToComponent={props.GoToComponent} formatGoToElement={props.formatGoToElement} />}
   
        </React.Fragment>
    );
}


export default injectIntl(ConditionElementBuilder);