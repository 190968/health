import React from 'react';
import {Form, Input, Select, Checkbox, Button, Divider} from 'antd';
import { prepareBrahmsRulesField, BrahmsAsField } from '../../../../../../../../components/Brahms/components/Manager/containers/Field';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;



const formItemLayout = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 6},

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

const AssessmentsManagerSettings = props => {
    const {assessment, form} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {name, description, instructions, showProgress=true, showScore=false, showAllSections=true,showAllQuestions=true, allowGoBack=true, isAllMandatory=false,showQuestionNumber=false, showValidAnswer, showBrahms, getBrahmsRules=[]} = assessment || {};
    // console.log(props, 'props');
    // console.log(showAllSections, 'showAllSections');
    return <React.Fragment>
        <Form>
            <FormItem
                {...formItemLayout}
                label="Name"
            >
                {getFieldDecorator('name', {
                    initialValue: name,
                    rules: [{
                        required: true,
                        message: "Please enter name",
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
                    <TextArea  autosize={{ minRows: 2, maxRows: 6 }}  />
                )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label="Instructions"
            >
                {getFieldDecorator('instructions', {
                    initialValue: instructions,
                     
                })(
                    <TextArea  autosize={{ minRows: 2, maxRows: 6 }}  />
                )}
            </FormItem>

            <FormItem
                {...tailFormItemLayout}
            >
                <span className={'ant-form-text'}>
                {getFieldDecorator('showProgress', {
                    initialValue: showProgress,
                    valuePropName: 'checked'
                })(
                    <Checkbox>Show Progress</Checkbox>
                )}
                </span>
            </FormItem>

            <FormItem
                {...formItemLayout}
                label="Section display"
            >
                {getFieldDecorator('showAllSections', {
                    initialValue: showAllSections,
                     
                })(
                    <Select>
                        <Option value={true}>Show all sections at once</Option>
                        <Option value={false}>Show next section only after completing current section</Option>
                    </Select>
                )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label="Section display"
            >
                {getFieldDecorator('showAllQuestions', {
                    initialValue: showAllQuestions,
                     
                })(
                    <Select>
                        <Option value={true}>Show all questions at once</Option>
                        <Option value={false}>Show one question at a time</Option>
                    </Select>
                )}
            </FormItem>

            {(getFieldValue('showAllSections') === false || getFieldValue('showAllQuestions') === false) && <FormItem
                {...tailFormItemLayout}
            >
                <span className={'ant-form-text'}>
                {getFieldDecorator('allowGoBack', {
                    initialValue: allowGoBack,
                    valuePropName: 'checked'
                })(
                    <Checkbox>Allow user to change previous selection</Checkbox>
                )}
                </span>
            </FormItem>}

            <FormItem
                {...tailFormItemLayout}
            >
                <span className={'ant-form-text'}>
                {getFieldDecorator('isAllMandatory', {
                    initialValue: isAllMandatory,
                    valuePropName: 'checked'
                })(
                    <Checkbox>User must answer all the questions</Checkbox>
                )}
                </span>
            </FormItem>

            <FormItem
                {...tailFormItemLayout}
            >
                <span className={'ant-form-text'}>
                {getFieldDecorator('showQuestionNumber', {
                    initialValue: showQuestionNumber,
                    valuePropName: 'checked'
                })(
                    <Checkbox>Show question number</Checkbox>
                )}
                </span>
            </FormItem>

            <FormItem
                {...formItemLayout}
                label="Show answer"
            >
                {getFieldDecorator('showValidAnswer', {
                    initialValue: showValidAnswer,
                     
                })(
                    <Select>
                        <Option value={'question'}>Show user correct answer after each question is completed</Option>
                        <Option value={'hide'}>Don't show the right answer</Option>
                        <Option value={'summary'}>Show user correct answers when assessment is completed</Option>
                    </Select>
                )}
            </FormItem>

           

            <Divider>Grade</Divider>
            <FormItem
                {...tailFormItemLayout}
            >
                <span className={'ant-form-text'}>
                {getFieldDecorator('showScore', {
                    initialValue: showScore,
                    valuePropName: 'checked'
                })(
                    <Checkbox>Show user score at the end of assessment</Checkbox>
                )}
                </span>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Show BRAHMS"
            >
                {getFieldDecorator('showBrahms', {
                    initialValue: showBrahms,
                })(
                    <Select>
                        <Option value={'question'}>Right after the question</Option>
                        <Option value={'summary'}>Upon completion (as a summary)</Option>
                        <Option value={'both'}>Right after the question and Upon completion (as a summary)</Option>
                    </Select>
                )}
            </FormItem>

            {getFieldValue('showScore') && <FormItem
                    {...formItemLayout}
                    label="BRAHMS"
                >
                    {getFieldDecorator('brahms', {
                        initialValue: prepareBrahmsRulesField(getBrahmsRules),
                    })(
                    <BrahmsAsField label={'Score'} type={'input'} excludeActions={['goto']} />
                )}
                </FormItem>}

        </Form>

        <div style={{textAlign:'right'}}>
            <Button  type={'primary'} onClick={props.onSubmit}>{props.isLastSection ? 'Finish' : 'Next'}</Button>
        </div>

        </React.Fragment>
}
 
export default AssessmentsManagerSettings;