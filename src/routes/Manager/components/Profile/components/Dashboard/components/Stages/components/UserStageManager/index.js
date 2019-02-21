import React from 'react';
import { Form, Select, Checkbox, Table, Input } from 'antd';
import { DateField, TimeField } from '../../../../../../../../../../components/FormCustomFields';
import { FormattedMessage } from 'react-intl';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
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
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const UserStageManager = props => {
    const {stages=[], patientStages=[], form} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const isPast = getFieldValue('isPast');

    // get current stage
    const currentUserStage = patientStages.find(item => item.isCurrent);
    
    const {stage} = currentUserStage || {};
    const {getChecklist=[]} = stage || {};
    if (getChecklist.length > 0) {
       return <UserStageChecklist currentUserStage={currentUserStage} form={form} />
    }
    const {id:currentStateId} = stage || {};
    const currentUserStageIndex = stages.findIndex(item => item.id === currentStateId);
    
    return <Form>

    <FormItem
            {...formItemLayout}
            label="Status"
          >
          {getFieldDecorator('status', {
                    initialValue: currentStateId,
                    rules: [{ required: true, message: 'Please enter Status' }],
            })(
            <Select>
                   {stages.map((stage, i) => {
                        const disabled = currentUserStageIndex > i;
                       return <Option key={stage.id} value={stage.id} disabled={disabled}>{stage.title}</Option>;
                   })}
            </Select>)}
    </FormItem>
    <FormItem
            {...tailFormItemLayout}
          >
           {getFieldDecorator('isPast', {valuePropName: 'checked'})(<Checkbox>Happened in the past</Checkbox>)}
    </FormItem>
    {isPast && <React.Fragment>
        <FormItem
                {...formItemLayout}
                label="Date"
            >
            {getFieldDecorator('date', {
                 rules: [{ required: true, message: 'Please select date' }],
            })(<DateField />)}
        </FormItem>
        <FormItem
                {...formItemLayout}
                label="Time"
            >
            {getFieldDecorator('time', {})(<TimeField />)}
        </FormItem>
    </React.Fragment>}
</Form>
}

export default UserStageManager;


const UserStageChecklist = props => {
    const {currentUserStage, form} = props;
    const {getFieldDecorator} = form;
    console.log(currentUserStage);
    const {stage} = currentUserStage;
    const {getChecklist=[]} = stage;

    const columns = [
		{
			// title: <Checkbox  />,
			key: 'comments',
			render: (title, info) => {
                const {id} = info;
                return getFieldDecorator('checklist['+id+'][checked]', {
                    //initialValue: title,
                    valuePropName: 'checked'
                })(<Checkbox  />);
			}
        },
		{
			title: <FormattedMessage id={'name'} defaultMessage={"Name"} />,
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: <FormattedMessage id={'date'} defaultMessage={"Date"} />,
			key: 'date',
			render: (title, info) => {
                const {id} = info;
                // console.log(title);
                return getFieldDecorator('checklist['+id+'][date]', {
                   // initialValue: title,
                   rules: [{ required: true, message: 'Please Select Date' }],
                })(<DateField />);
			}
		},
		{
			title: <FormattedMessage id={'comments'} defaultMessage={"Comments"} />,
			key: 'comments',
			render: (title, info) => {
                const {id} = info;
                return getFieldDecorator('checklist['+id+'][comments]', {
                    //initialValue: title,
                })(<TextArea  autosize={{ minRows: 1, maxRows: 6 }} />);
			}
        }
        
    ];

    return <Table dataSource={getChecklist} rowKey={'id'} columns={columns} pagination={false} />
}