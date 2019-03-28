import React from 'react';
import {injectIntl} from 'react-intl';
import {Form, Input, Select} from 'antd';
import TextElementTipIcons from './containers/TextElementTipIcons';
import messages from './messages';
import { Wysiwyg } from '../../../../../../../../components/FormCustomFields/components/Wysiwyg';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const formTailLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19, offset: 5},
};

const options = [
    {label:'Tip',value:1},
    {label:'Attention',value:2},
    {label:'Remember',value:3},
    {label:'Warning!',value:4},
    {label:'Did You Know?',value:5}
]
export const getTipBoxTypeLabel = tipbox => {
    const option = options.find(o=>o.value == tipbox);
    const {label} = option || {};

    return label;
}

const TextElementBuilder = (props) => {
    const {form, intl,  details={}} = props;
    const {getFieldDecorator} = form;
    const {text='', icon, tipType, iconAlign} = details || {};
    const {id:iconId} = icon || {};
    return (
        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.title)}
            >
                {getFieldDecorator('text', {
                        initialValue:text,
                        rules: [{required: true, message: "Enter Text", whitespace: true}],
                    }
                )(
                    <Wysiwyg />
                    // <TextArea autosize={{ minRows: 2}} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={'Type'}
            >
                {getFieldDecorator('type', {
                        initialValue:tipType,
                        rules: [{required: true, message: "Select Type"}],
                    }
                )(
                    <Select style={{width:250}}>
                        {options.map(o => <Option value={o.value}>{o.label}</Option>)}
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={'Icon Allign'}
            >
                {getFieldDecorator('iconAlign', {
                        initialValue:iconAlign,
                        rules: [{required: true, message: "Select Align"}],
                    }
                )(
                    <Select style={{width:250}}>
                        <Option value={'left'}>Left</Option>
                        <Option value={'right'}>Right</Option>
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.toolpic)}
            >
                {getFieldDecorator('icon', {
                        initialValue:iconId,
                        rules: [{required: true, message: "Select Icon"}],
                    }
                )(
                    <TextElementTipIcons />
                )}
            </FormItem>
        </React.Fragment>
    );
}

export default injectIntl(TextElementBuilder);
