import React from 'react';
import {Input} from 'antd';
import { compose,withStateHandlers, withState } from 'recompose';
const TextArea = Input.TextArea;

const BrahmsRuleActionOutputPure = props => {
    console.log(props);
    const {message, onChange} = props;
    return <TextArea autosize={{ minRows: 2, maxRows: 6 }} value={message} onChange={onChange} />
}

const enhance = compose(
    withStateHandlers( props => {
        const {value} = props;
        // const {outputActionInput} = value || {};
        const {message} = value || {};
        return {message};
    }, {
        onChange: (state, props) => (e) => {
            const value = e.target.value;
            const input = prepareBrahmsOutputActionInput({message:value});
            props.onChange(input);
            return {
                message:value
            }
        }
    })
);
export const BrahmsRuleActionOutput = enhance(BrahmsRuleActionOutputPure);

export const prepareBrahmsOutputActionInput = value => {

    return value;
}
