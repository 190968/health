import React from 'react';
import {Form, Input, Select, Checkbox, Button, Divider} from 'antd';
import { prepareBrahmsRulesField, BrahmsAsField } from '../../../../../../../../components/Brahms/components/Manager/containers/Field';
import CohortSelect from '../../../../../../../../components/Autosuggest/containers/CohortSelect';
import TaskAssignButton from '../../../../../../../../components/Tasks/components/TaskAssignButton';
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
    const {assessment, form, loading} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {id, isPrivate=false, getCohorts} = assessment || {};
    return <React.Fragment>
        <Form>
        <FormItem
                {...tailFormItemLayout}
            >
                <span className={'ant-form-text'}>
                {getFieldDecorator('isPrivate', {
                    initialValue: isPrivate,
                    valuePropName: 'checked'
                })(
                    <Checkbox>Make this assessmet private</Checkbox>
                )}
                </span>
            </FormItem>


            <FormItem
                {...formItemLayout}
                label="Cohorts"
            >
                {getFieldDecorator('cohorts', {
                    initialValue: getCohorts,
                     
                })(
                    <CohortSelect mode= {'multiple'} />
                )}
            </FormItem>
 
        </Form>

        <div style={{textAlign:'right'}}>
            <Button disabled >Print</Button> <TaskAssignButton label={'Prescribe'} size={'default'} mode={'simple'} buttonType={'green'} assignObject={{type: 'assessment', object:assessment}} /> <Button  type={'primary'} onClick={props.onSubmit}>Publish</Button>
        </div>

        </React.Fragment>
}
 
export default AssessmentsManagerSettings;