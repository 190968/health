import React from 'react';
import {Form, Input, Checkbox, Row, Col} from 'antd';
const FormItem = Form.Item;
const formItemLayoutDefault = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 5},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};
const AssessmentQuestionAnswerManager = props => {
    
        const {answer, formItemLayout=formItemLayoutDefault} = props;
        const {label, isCritical=false, isOpenEnded=false, isValidAnswer=false, points=0} = answer || {};
        return <>
            <FormItem
                {...formItemLayout}
                label={'Label'}
            >
                <Input value={label} onChange={props.setLabel} />
            </FormItem>
            <FormItem
                {...tailFormItemLayout}
            >
            <Checkbox checked={isOpenEnded} onChange={props.setIsOpenEnded} >This is an open ended answer</Checkbox>
            </FormItem>
            <FormItem
                {...tailFormItemLayout}
            >
            <Checkbox checked={isValidAnswer} onChange={props.setIsValid} >This is a correct answer</Checkbox>
            </FormItem>
            <FormItem
                {...tailFormItemLayout}
            >
            <Checkbox checked={isCritical} onChange={props.setIsCritical} >This is a critical answer</Checkbox>
            </FormItem>
            <FormItem
               {...formItemLayout}
               label={'Points'}
               help={'Points for the answer'}
            >
            <Input value={points} onChange={props.setPoints} />
            </FormItem>
        </>
}

export default AssessmentQuestionAnswerManager;