import React from 'react';
import {Input} from 'antd';
import { compose, withStateHandlers } from 'recompose';
const TextArea = Input.TextArea;

const BrahmsRuleActionNotificationPure = props => {
    // console.log(props);
    const {text, onChange} = props;
    return <TextArea autosize={{ minRows: 2, maxRows: 6 }} value={text} onChange={onChange} />
}

const enhance = compose(
    withStateHandlers( props => {
        const {value} = props;
        // const {outputActionInput} = value || {};
        const {text} = value || {};
        return {text};
    }, {
        onChange: (state, props) => (e) => {
            const value = e.target.value;
            // const {attachments} = state;
            // const input = prepareBrahmsOutputActionInput({message:value, attachments});
            // console.log(input);
            props.onChange({text:value});
            return {
                text:value
            }
        }
    })
);
export const BrahmsRuleActionNotification = enhance(BrahmsRuleActionNotificationPure);

export const prepareBrahmsNotificationActionInput = value => {
    const {text } = value;
    return {text};
}
