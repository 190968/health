
import React from 'react';
import {Form, Input, Icon, Tooltip} from 'antd';
import { SortableElement} from 'react-sortable-hoc';
import {withHandlers} from 'recompose';
import {InputField} from '../../../InputField';
import { DragHandle } from '../..';
const FormItem = Form.Item;
const TextArea = Input.TextArea;

const OptionItem = SortableElement((props) => {
    const {form, option, i:index, options=[], remove, updateOption, minOptions, timeout=0} = props;
    // const {getFieldDecorator} = form;
    // const block = option || {};
    const {label} = option || {};
    // form.setFieldsValue({
    //     ['aaaaaaaa']: 'aaa'
    // });

// console.log(block);
// console.log(options);
    //console.log(form.getFieldsValue(), 'Values');
    //console.log(options);
    // const optionError = form.getFieldError(`options[${index}]`);
    //console.log(index);
    return <li style={{position:'relative', marginBottom:5}}>
        {/*<TreatmentBlockManagerModal k={k} form={form} planId={planId} treatmentId={treatmentId} details={block} id={block.id||''} onHide={this.hideBlock} />*/}

        <div style={{marginRight:50}}>
            <FormItem
                // help={optionError || ''}
                // validateStatus={optionError ? 'error' : ''}
            >
                {/*getFieldDecorator(`keys[${index}]`, {initialValue: k})(<Input />)*/}
                {/* {getFieldDecorator(`options[${index}]`, {
                    initialValue: block.label || '',
                    validateTrigger: ['onChange', 'onBlur'],
                    //trigger: 'onChange',
                    rules: [{
                        required: true,
                        message: "Please enter option "+((index+1))+" or delete this line.",
                    }],
                })( */}
                {/* <TextArea  onChange={props.onChange} autosize={{minRows:1}} /> */}
                <InputField noState asTextArea value={label} onChange={props.onChange} placeholder={"Option "+(index+1)} autosize={{ minRows: 1, maxRows: 6 }} style={{ width: '100%', marginRight: 8 }} timeout={timeout} />
                {/* )} */}
            </FormItem>
        </div>
        <div style={{position:'absolute', right:0, top:3}}>
        {/* <DragHandle /> */}
        {options.length > minOptions ? (
            <Tooltip title="Remove Option"><Icon
                className="dynamic-delete-button"
                style={{marginLeft:5,  verticalAlign:'middle'}}
                type="minus-circle-o"
                disabled={options.length <= minOptions}
                onClick={() => remove(null, index)}
            /></Tooltip>
        ) : null}
        </div>

    </li>;
});


export default withHandlers({
    onChange: props => value => {
        // const value = e.target.value;
        //  console.log(e);
        //  console.log(value);
        const {i, updateOption} = props;
        if (updateOption) {
            updateOption(value, i);
        }
    }
})(OptionItem);