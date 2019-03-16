import React from 'react';
import {Form, Input, InputNumber, Row, Col, Checkbox} from 'antd';
import { BrahmsAsField, prepareBrahmsRulesField } from '../../../../../Brahms/components/Manager/containers/Field';
import {SelectAssessmentQuestion} from '../../containers/SelectAssessmentQuestion';
import AssessmentQuestionBrahmsFormField from './_brahms';
const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayoutDefault = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 6},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
    },
};

const AssessmentQuestionYesNoManager = props => {
    
        const {question, form, type:typeInit, assessment} = props;
        const {getFieldDecorator, getFieldValue} = form;
        const {title, description, type=typeInit, getAnswers=[], getBrahmsRules=[]} = question || {};
        const  formItemLayout=formItemLayoutDefault;
        const isTypeTime = type == 'time';
        const showBrahms = !isTypeTime && question;

        let answers = [
            {label:'Yes', isCritical:false, points:0},
            {label:'No', isCritical:false, points:0},
        ];

        if (getAnswers.length == 2) {
            answers = getAnswers;
        }
        const yesInfo = answers[0] || {};
        const noInfo = answers[1] || {};
       
        console.log(yesInfo, 'yesInfo');

        getFieldDecorator('yes[id]', {
            initialValue: yesInfo.id,
        });
        getFieldDecorator('no[id]', {
            initialValue: noInfo.id,
        });
        return <Form onSubmit={props.onSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="Question"
                >
                    {getFieldDecorator('title', {
                        initialValue: title,
                        rules: [{
                            required: true,
                            message: "Please enter question title",
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Description"
                >
                    {getFieldDecorator('description', {
                        initialValue: description,
                    })(
                        <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
    
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Points for Yes"
                >

                <Row>
                    <Col span={8}>
                    {getFieldDecorator('yes[points]', {
                       initialValue: yesInfo.points,
                    })(
                        <InputNumber  />
                    )}
                    </Col>
                    <Col span={12}>
                    {getFieldDecorator('yes[isCritical]', {
                       initialValue: yesInfo.isCritical,
                    })(
                        <Checkbox>Is Critical</Checkbox>
                    )}
                    </Col>
                </Row>
                    
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Points for No"
                >
                    <Row>
                    <Col span={8}>
                    {getFieldDecorator('no[points]', {
                       initialValue: noInfo.points,
                    })(
                        <InputNumber  />
                    )}
                    </Col>
                    <Col  span={12}>
                    {getFieldDecorator('no[isCritical]', {
                        initialValue: noInfo.isCritical,
                    })(
                        <Checkbox>Is Critical</Checkbox>
                    )}
                    </Col>
                </Row>
                </FormItem>

                {/* <AssessmentQuestionFieldsManager form={form} question={question} type={type} formItemLayout={formItemLayout} /> */}


{showBrahms && <AssessmentQuestionBrahmsFormField form={form} possibleOptions={answers} assessment={assessment} question={question} formatGoToElement={props.formatGoToElement} />}
            
                {/* {showBrahms && <FormItem
                    {...formItemLayout}
                    label="BRAHMS"
                >
                    {getFieldDecorator('brahms', {
                        initialValue: prepareBrahmsRulesField(getBrahmsRules),
                    })(
                    <BrahmsAsField form={form}  possibleOptions={answers} assessment={assessment} question={question} GoToComponent={SelectAssessmentQuestion} formatGoToElement={props.formatGoToElement} />
                )}
                </FormItem>} */}
            </Form>
}



export default AssessmentQuestionYesNoManager;

