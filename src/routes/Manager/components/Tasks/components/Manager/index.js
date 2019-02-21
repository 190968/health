import React from 'react';
import { Form, Select, Input, Radio } from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from './i18n/en';
import DefaultI18nEn from '../../../../../../i18n/en';
import PatientSelect from '../../../../../../components/Autosuggest/containers/PatientSelect';
import { DateField } from '../../../../../../components/FormCustomFields';
import { TaskManagerAttachments } from '../../../../../../components/Tasks/containers/Attachments';
import { TaskAssign } from './containers/Assign';
import { PRIORITIES_LIST } from '../../../../../../constants/priorities';
import AvatarWithName from '../../../../../User/components/AvatarWithName';
import { validateTaskAssign } from './components/Assign';
import { TaskForwardButton } from '../View/components/ForwardButton';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const formItemLayout = {
  labelCol: {
    xs: { span: 20 },
    sm: { span: 6 },

  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};


const TaskManager = props => {
  //patient
  const {form, task, patient} = props;
  const {getFieldDecorator, getFieldsValue, getFieldValue} = form;

  const {id='', participants} = task || {};
  const isEdit = id !== '' || false;

  const patientSelected = id !== '' || patient && patient.id !== '';

  console.log(getFieldsValue(), 'TASKMANAGER');

  return <Form onSubmit={props.handleSubmit}>
   <FormItem
      {...formItemLayout}
      label={<FormattedMessage {...DefaultI18nEn.patient} /> }
    >
      {getFieldDecorator('patient', {
        //initialValue: title,
        rules: [{
          required: true,
          //message: "Please select Diagnosis",
        }],
      })(
        <PatientSelect getFullInfo={true} disableSelect={patientSelected}  allowClear={false} />
      )}
    </FormItem>

    <FormItem
      {...formItemLayout}
      label={<FormattedMessage {...messages.type} />}
    >
      {getFieldDecorator('type', {
        //initialValue: title,
        rules: [{
          required: true,
          //message: "Please select Diagnosis",
        }],
      })(
        <Select>
          <Select.Option value={'task'}>Task</Select.Option>
          <Select.Option value={'case'}>Case</Select.Option>
        </Select>
      )}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label={<FormattedMessage {...messages.source} />}
    >
      {getFieldDecorator('source', {})(<Input />)}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label={<FormattedMessage {...messages.activity} />}
    >
      {getFieldDecorator('title', {
        rules: [{
          required: true,
          //message: "Please select Diagnosis",
        }],
      })(<Input />)}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label={<FormattedMessage {...messages.guidelines} />}
    >
      {getFieldDecorator('guidelines', {})(<Input />)}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label={<FormattedMessage {...DefaultI18nEn.priority} />}
    >
      {getFieldDecorator('priority', {})(
      <Select >
        {PRIORITIES_LIST({withIcon:true}).map(({value, label}) => <Select.Option key={value} value={value}>{label}</Select.Option>)}
      </Select>)}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label={<FormattedMessage {...messages.dueDate} />}
    >
      {getFieldDecorator('endDate', {
        rules: [{
          required: true,
        }],
      })(<DateField />)}
    </FormItem>
    {!isEdit ? 
    <FormItem
      {...formItemLayout}
      label={<FormattedMessage {...messages.assignTo} />}
    >
      {getFieldDecorator('assignMode', {
        rules: [{
          required: true,
          // type: 'object',
          // validator: validateTaskAssign,
          // message: <FormattedMessage {...messages.errMain} />,
          // messages: {
          //   main:<FormattedMessage {...messages.errMain} />,
          //   provider:<FormattedMessage {...messages.errProvider} />,
          //   participants:<FormattedMessage {...messages.errParticipants} />,
          // }
        }],
       
      })(<TaskAssign patient={getFieldValue('patient')} form={form} />)}
    </FormItem>
    : 
    <FormItem
      {...formItemLayout}
      label={<FormattedMessage {...messages.assignTo} />}
    >
     {/* {recipient && <AvatarWithName user={recipient} />} */}
     {participants && participants.map(participant => <div key={participant.id}><AvatarWithName user={participant} /></div>)}
      <TaskForwardButton task={task} />
    </FormItem>
    }
    {/* <FormItem
      {...formItemLayout}
      label={<FormattedMessage {...messages.notify} />}
    >
      {getFieldDecorator('notify', {})(<Input />)}
    </FormItem> */}
    <FormItem
      {...formItemLayout}
      label={<FormattedMessage {...messages.attachments} />}
    >
     {getFieldDecorator('attachments', {
        // rules: [{
        //   //required: true,
        //    type: 'array',
        //   // validator: validateTaskAssign,
        //   // message: <FormattedMessage {...messages.errMain} />,
        //   // messages: {
        //   //   main:<FormattedMessage {...messages.errMain} />,
        //   //   provider:<FormattedMessage {...messages.errProvider} />,
        //   //   participants:<FormattedMessage {...messages.errParticipants} />,
        //   // }
        // }],
     })(<TaskManagerAttachments patient={getFieldValue('patient')} form={form} task={task} date={getFieldValue('endDate')} />)}
      
    </FormItem>
  </Form>
}

export default TaskManager;